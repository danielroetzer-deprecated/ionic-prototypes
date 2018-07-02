import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageProvider {

  constructor(private storage: Storage) {

  }

  //Save login information in the storage
  saveLoginData(username, password, token) {
    this.storage.set('login', {
      username: username,
      password: password,
      token: token
    });
  }

  //Retrieve login information from the storage
  getLoginData() {
    return this.storage.get('login');
  }

  //Removes a specific entry
  removeData(key) {
    this.storage.remove(key);
  }

  //Saves the current user location
  saveUserLocation(latitude, longitude) {
    this.storage.set('Coordinates', {
      latitude: latitude,
      longitude: longitude
    });
  }

  //Returns data defined by 1 key
  getSingleEntry(key: string) {
    return this.storage.get(key);
  }

}
