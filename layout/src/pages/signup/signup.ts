import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


//Disable Sidemenu
import { DisableSideMenu } from './../../custom_decorators/sidemenu_disable.decorator';

@DisableSideMenu()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
