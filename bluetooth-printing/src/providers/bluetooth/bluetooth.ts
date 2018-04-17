import { AlertController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { Injectable } from '@angular/core';


@Injectable()
export class BluetoothProvider {

  constructor(private btSerial: BluetoothSerial, private alert: AlertController) {
  
  }

  search() {
    return this.btSerial.list();
  }

  connect(address) {
    return this.btSerial.connect(address);
  }

  printTestPage(address) {
    let text = "=========================\n##-- ##--\n#-#- #-#-\n#--# ##--\n#-#- #-#-\n##-- #--#\n=========================\nabcdefghijklmnopqrstuvwxyz1234567890\n\n\n\n";

    /**
     * ##**** ##****
     * #*#*** #*#***
     * #**#** ##****
     * #*#*** #*#***
     * ##**** #**#**
     * #
     */
    
    let print = this.connect(address).subscribe(data => {
      this.btSerial.write(text).then(data => {
        this.showAlert('Test Page successfully printed');
        print.unsubscribe();
      }, err => {
        console.log(err);
        this.showAlert(err);
      });
    }, err => {
      console.log(err);
      this.showAlert(err);
    });
  }


  printCustomPage(address, text) {
    let print = this.connect(address).subscribe(data => {
      this.btSerial.write(text + '\n\n\n\n').then(data => {
        this.showAlert('Custom Page successfully printed');
        print.unsubscribe();
      }, err => {
        console.log(err);
        this.showAlert(err);
      });
    }, err => {
      console.log(err);
      this.showAlert(err);
    });
  }


  showAlert(message) {
    let xyz=this.alert.create({
      title: message,
      buttons:['Dismiss']
    });
    xyz.present();
  }

}
