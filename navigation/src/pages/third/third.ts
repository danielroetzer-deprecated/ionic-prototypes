import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ThirdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-third',
  templateUrl: 'third.html',
})
export class ThirdPage {
  token2: string = null;
  firstname2: string = null;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.grabNavParams();
  }

  grabNavParams(){
    this.token2 = this.navParams.get('token');
    this.firstname2 = this.navParams.get('firstname');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ThirdPage');
  }

}
