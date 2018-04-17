import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RecievedMessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-recieved-messages',
  templateUrl: 'recieved-messages.html',
})
export class RecievedMessagesPage {

  msg: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.msg = this.navParams.get('msg');
  }

  ionViewDidLoad() {

  }

}
