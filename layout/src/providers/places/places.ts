import { Injectable } from '@angular/core';

declare var google;

@Injectable()
export class PlacesProvider {

  constructor() {

  }

  getNearbyPlaces(latLng, [types], places_service) {
    let request = {
        location : latLng,
        radius : 8047 ,
        types: [types]
    };
    return new Promise((resolve,reject)=>{
        places_service.nearbySearch(request,function(results,status){
            if(status === google.maps.places.PlacesServiceStatus.OK)
            {
                resolve(results);    
            }else
            {
                reject(status);
            }
        }); 
    });
  }

}
