import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-device-list-modal',
  templateUrl: 'device-list-modal.html',
})
export class DeviceListModalPage {

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
