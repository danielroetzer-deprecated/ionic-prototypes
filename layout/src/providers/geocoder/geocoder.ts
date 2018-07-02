import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';

@Injectable()
export class GeocoderProvider {

  constructor(public http: HttpClient, private geocoder: NativeGeocoder) {

  }

  //Reverses coordinates (lat+long) into a string
  reverseGeocode(lat : number, lng : number) : Promise<any>
  {
    return new Promise((resolve, reject) =>
    {
        this.geocoder.reverseGeocode(lat, lng)
        .then((result : NativeGeocoderReverseResult) =>
        {
          //let str : string   = `The reverseGeocode address is ${result.street} in ${result.countryCode}`;
          resolve(result);
        })
        .catch((error: any) =>
        {
          reject(error);
        });
    });
  }


  //Forwards a string to coordinates
  forwardGeocode(keyword : string) : Promise<any>
  {
    return new Promise((resolve, reject) =>
    {
        this.geocoder.forwardGeocode(keyword)
        .then((coordinates : NativeGeocoderForwardResult) =>
        {
          //let str : string   = `The coordinates are latitude=${coordinates.latitude} and longitude=${coordinates.longitude}`;
          resolve(coordinates);
        })
        .catch((error: any) =>
        {
          reject(error);
        });
    });
  }

}
