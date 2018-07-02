import { PlacesProvider } from './../../providers/places/places';
import { ToastProvider } from './../../providers/toast/toast';
import { GeocoderProvider } from './../../providers/geocoder/geocoder';
import { StorageProvider } from './../../providers/storage/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//Prevent warnings and errors with this declaration
declare var google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  search: string;

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  places: Array<any>;
  autocomplete_service: any;
  places_service: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, private store: StorageProvider, private geocode: GeocoderProvider, private toast: ToastProvider, private zone: NgZone, private placesProvider: PlacesProvider) {

  }


  ionViewDidLoad() {
    //Init autocomplete service
    this.autocomplete_service = new google.maps.places.AutocompleteService();

    //Lookup the storage for coordinates
    this.store.getSingleEntry('Coordinates').then((data) => {
      if(data){
        this.initMap(data['latitude'], data['longitude'])
      }else {
        this.initMap(48.210033, 16.363449);
      }
    });
  }


  //Initialize Map
  initMap(latitude, longitude) {
    let latLng = new google.maps.LatLng(latitude, longitude);

    let mapOptions = {
      center: latLng,
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.places_service = new google.maps.places.PlacesService(this.map);
  }


  //Load new map with coordinates and the zoom
  loadMap(latitude, longitude, zoom) {
    let latLng = new google.maps.LatLng(latitude, longitude);

    let mapOptions = {
      center: latLng,
      zoom: zoom,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.places_service = new google.maps.places.PlacesService(this.map);
  }

  /**
   * To change the map view instead of creating a new map,
   * there are many methods for it:
   *
   * let mapOptions = {}
   * this.map.setOptions(mapOptions);
   * this.map.setCenter(latLng);
   * this.map.panTo(latLng);
   * this.map.setZoom(10);
   *
   */



  //Locate the user and center the map on the users position
  getUserPosition() {
    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.places_service = new google.maps.places.PlacesService(this.map);

      //Save location in the storage
      this.store.saveUserLocation(position.coords.latitude, position.coords.longitude);

      this.addMarker('<strong>Your current Position</strong>');

    }, (err) => {
      this.toast.showToastAngular(JSON.stringify(err), 10000, 'bottom');
      console.log(err);
    });
  }



  //Add marker at the center location
  addMarker(info){

    //Create the new marker
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter(),
      title: info
    });

    //Add a info window to it
    this.addInfoWindow(marker, info);
  }



  //Clicking on the marker will show ah little information window
  addInfoWindow(marker, info){

    //Create the new info window
    let infoWindow = new google.maps.InfoWindow({
      content: info
    });

    //Listener for click on marker
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

    //instantly open the window
    infoWindow.open(this.map, marker);
  }



  //Gets called when the user submits the searchbar input
  onSearch() {
    //Send the searched term to the GeocoderProvider
    //then loadMap() with the forwarded coordinates
    this.geocode.forwardGeocode(this.search)
    .then(coordinates => {
      this.loadMap(coordinates[0].latitude, coordinates[0].longitude, 11);

      //Get more information about the forwarded coordinates
      this.geocode.reverseGeocode(coordinates[0].latitude, coordinates[0].longitude)
      .then(data => {
        this.addMarker('<h4>' + data[0].locality + '</h4>');
      }, err => {
        console.log(err);
        this.toast.showToastNative(JSON.stringify(err), 10000, 'bottom');
      });

      this.places = [];
      this.search = '';

    },err =>{
      console.log(err);
      this.toast.showToastAngular(JSON.stringify(err), 10000, 'middle');
    }).catch(err => {
      console.log(err);
      this.toast.showToastNative(JSON.stringify(err), 10000, 'bottom');
    });
  }


  //Called by floating buttons for nearby places
  getNearbyPlaces([type]) {
    //get nearby places from PlacesProvider
    this.placesProvider.getNearbyPlaces(this.map.getCenter(), [type], this.places_service)
    .then((results : Array<any>)=>{
      for(let i = 0 ;i < results.length ; i++)
      {
          this.addPlacesMarker(results[i]);
      }
    },err => {
      console.log(err);
      this.toast.showToastNative(JSON.stringify(err), 10000, 'bottom');
    });
  }


  //Marker for places
  addPlacesMarker(place)
  {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: place.geometry.location,
      title: place.name
    });

    let infoWindow = new google.maps.InfoWindow({
      content: place.name
    });

    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.open(this.map, marker);
    });
  }


  //Gets called by the searchbar on input
  placesAutocomplete() {
    //Gets predictions when input field has at least 1 letter, otherwise sets the places array empty
    if(this.search.length > 0) {

      let config = {
          types: ['geocode'],
          input: this.search
      }

      this.autocomplete_service.getPlacePredictions(config, (predictions, status) => {
        if(status == google.maps.places.PlacesServiceStatus.OK && predictions){

          //zone.run() makes sure that the <ion-list> is updated after every keystroke
          //without this it does not update the latest pressed key properly
          //for example: you type 'wa' and you would only get predictions for 'w',
          this.zone.run(()=>{
            //Reset array and then fill it with new predictions
            this.places = [];
            predictions.forEach((prediction) => {
              this.places.push(prediction);
            });
          }); 
        }
      });
    } else {
        this.places = [];
    }
  }

  //Gets called when a place prediction in the <ion-list> gets clicked
  selectPlace(place) {
    //this.toast.showToastNative(JSON.stringify(place), 10000, 'center');

    this.places = [];
    this.search = '';

    //get coordinates for the selectet place
    this.places_service.getDetails({placeId: place.place_id}, (details) => {
      this.loadMap(details.geometry.location.lat(), details.geometry.location.lng(), 15);
      this.addMarker(details.name);
    });
  }
}
