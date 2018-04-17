import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation} from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  latitude: number = 0;
  longitude: number = 0;
  accuracy: number = 0;
  altitude: number = 0;
  altitudeAccuracy: number = 0;
  heading: number = 0;
  speed: number = 0;


  error: string = null;

  constructor(public navCtrl: NavController, private geolocation: Geolocation) {

  }

  getCoordinates() {
    this.geolocation.getCurrentPosition().then((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.accuracy = position.coords.accuracy;
      this.altitude = position.coords.altitude;
      this.altitudeAccuracy = position.coords.altitudeAccuracy;
      this.heading = position.coords.heading;
      this.speed = position.coords.speed;

    }).catch((error) => {
      alert(error.code +'\n' + error.message);
      this.error = error.code;
      this.error += ' ' + error.message;
    });
  }

}
