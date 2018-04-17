import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Network } from '@ionic-native/network';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  connect;
  disconnect;

  message: string = 'listening...'

  constructor(public navCtrl: NavController, private network: Network) {
    this.disconnect = this.network.onDisconnect().subscribe(() => {
      console.warn('Network DISCONNECTED');
      this.message = 'Network disabled';
    });

    this.connect = this.network.onConnect().subscribe(() => {
      console.log('Network CONNECTED');
      this.message = 'Network enabled';
    });
  }


  ionViewWillLeave() {
    this.connect.unsubscribe();
    this.disconnect.unsubscribe();
  }

}
