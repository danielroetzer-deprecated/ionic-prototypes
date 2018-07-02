import { ToastProvider } from './../../providers/toast/toast';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { BluetoothDeviceListModalPage } from './../bluetooth-device-list-modal/bluetooth-device-list-modal';
import { Component } from '@angular/core';
import { NavController, AlertController, ModalController} from 'ionic-angular';
import { BluetoothProvider } from './../../providers/bluetooth/bluetooth';

@Component({
  selector: 'page-bluetooth-printer',
  templateUrl: 'bluetooth-printer.html',
})
export class BluetoothPrinterPage {

  printer_name: String = "No printer selected";
  printer: any;
  textarea: String = "";

  constructor(public navCtrl: NavController, private bluetooth: BluetoothProvider, private modalCtrl: ModalController, private alert: AlertController, private barcodeScanner: BarcodeScanner, private toast: ToastProvider) {
    //let image = new Image();
    //image.src = "./../../assets/imgs/star_wars.png";
    //this.showAlert('W:'+image.width+'H:'+image.height);
  }

  selectDevice() {
    this.bluetooth.search().then(list => {
      
      //Create modal
      let modal = this.modalCtrl.create(BluetoothDeviceListModalPage, {
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


  /**
   * 
   * EXPERIMENTAL
   */


  encodeData() {
    //let barcode = this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, "Does it Work??!?");

    /*if(this.printer.id == null || this.printer.id == "" || this.printer.id == undefined) {
      this.showAlert('Error: No printer selected!');
    }else {
      this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, "Does it Work??!?")
      .then(encodedData => {
        this.bluetooth.printCustomPage(this.printer.id, encodedData);
      }, err => {
        this.showAlert(JSON.stringify(err));
      });

      
    }*/

    //this.bluetooth.printCustomPage(this.printer.id, barcode);

    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, "another try...")
    .then(data => {
      //this.showAlert(data);
      this.toast.showToastAngular('succes: ' + JSON.stringify(data), 5000, 'middle');
    }, err => {
      this.toast.showToastAngular('err: ' + JSON.stringify(err), 5000, 'bottom');
    });
  }



  



  /*public toRaster() {
    // Init result
    let result = [];

    // Get width and height
    let width = this.width;
    let height = this.height;

    // N block lines
    let n = Math.ceil(width / 8);

    // Iterate
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < n; x++) {
            for (let b = 0; b < 8; b++) {
                let i = x * 8 + b;

                if (result[y * n + x] === undefined) {
                    result[y * n + x] = 0;
                }

                let c = x * 8 + b;

                if (c < width) {
                    if (this.data[y * width + i]) {
                        result[y * n + x] += (0x80 >> (b & 0x7));
                    }
                }
            }
        }
    }

    // Return result
    return {
        data: result,
        width: n,
        height: height
    };
  }  */

}
