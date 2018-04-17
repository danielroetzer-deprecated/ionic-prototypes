import { DeviceListModalPage } from './../device-list-modal/device-list-modal';
import { BluetoothProvider } from './../../providers/bluetooth/bluetooth';
import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  printer_name: String = "No printer selected";
  printer: any = "No printer selected";
  textarea: String = "";

  constructor(public navCtrl: NavController, private bluetooth: BluetoothProvider, private modalCtrl: ModalController, private alert: AlertController) {

  }

  selectDevice() {
    this.bluetooth.search().then(list => {
      
      //Create modal
      let modal = this.modalCtrl.create(DeviceListModalPage, {
        list: list
      });

      //On dismiss save selected device
      modal.onDidDismiss(device => {
        this.printer = device;
        this.printer_name = device.name
      });

      //Present modal
      modal.present();

    },err => {
      console.log(err);
      this.showAlert(JSON.stringify(err));
    });
  }

  printTestPage() {
    if(this.printer.id == null || this.printer.id == "" || this.printer.id == undefined) {
      this.showAlert('Error: No printer selected!');
    }else {
      this.bluetooth.printTestPage(this.printer.id);
    }
  }

  
  printCustomPage() {
    if(this.printer.id == null || this.printer.id == "" || this.printer.id == undefined) {
      this.showAlert('Error: No printer selected!');
    }else {
      if(this.textarea.length>=1) {
        this.bluetooth.printCustomPage(this.printer.id, this.textarea);
      }else {
        this.showAlert('You probably want to add some text before printing...');
      }
    }
  }


  showAlert(message) {
    let xyz=this.alert.create({
      title: message,
      buttons:['Dismiss']
    });
    xyz.present();
  }
}
