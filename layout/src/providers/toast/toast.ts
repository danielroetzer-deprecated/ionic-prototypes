import { ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Toast } from '@ionic-native/toast';


@Injectable()
export class ToastProvider {

  constructor(private toast: Toast, private toastCtrl: ToastController) {

  }
  //Native Toasts
  showGenericToastNative(text) {
    this.toast.showLongBottom(text).subscribe(toast => {
      console.log(toast);
    });
  }

  showToastNative(text, duration, position) {
    this.toast.show(text, duration, position).subscribe(toast => {
      console.log(toast);
    });
  }


  //Toasts provided by Angular
  showToastAngular(message, duration, position) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position
    });
    toast.present();
  }

}
