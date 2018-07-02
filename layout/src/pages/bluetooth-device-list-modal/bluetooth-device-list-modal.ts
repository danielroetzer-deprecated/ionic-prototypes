import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the BluetoothDeviceListModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-bluetooth-device-list-modal',
  templateUrl: 'bluetooth-device-list-modal.html',
})
export class BluetoothDeviceListModalPage {

  device_list: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    this.device_list = this.navParams.get('list');
  }

  selectDevice(device) {
    this.viewCtrl.dismiss(device);
  }

  cancel() {
    //this.viewCtrl.dismiss();
    this.navCtrl.pop();
  }

}
