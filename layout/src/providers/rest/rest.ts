import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';




@Injectable()
export class RestProvider {

  login_url = 'https://admin.kubid.cloud/auth/token';

  geocoding_url = 'https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyC0p6485pZBMCNe7atvjDiWLF0_MZ0PFxQ';


  constructor(public http: HttpClient) {

  }

  //Calls the server, with input from the user
  checkLoginInformation(username, password) {
    return new Promise((resolve, reject) => {
      this.http.post(this.login_url,{
        username: username,
        password: password,
        client_id: '6f73c35adebd17929baa90f5a7916a45',
        membership_type: 'customer'
      },{
        headers: {'Content-Type':'application/json'}
      }).subscribe(data => {
        //If post request was successfull, returns the answer from the server
        resolve(data);
      }, err => {
        console.log(err);
        //If post was unsuccessfull, returns the error
        reject(err);
      });
    });
  }

  /*getGeocoding(){
    return new Promise(resolve => {
      this.http.get(this.geocoding_url, {
        headers: {'Content-Type':'application/json'
      }}).subscribe(data => {
        //If get request was successfull, returns the answer from the server
        resolve(data);
      }, err => {
        console.log(err);
        alert(err.message);
      });
    });
  }*/

}
