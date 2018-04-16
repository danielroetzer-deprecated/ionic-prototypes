import { SecondPage } from './../second/second';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ThirdPage } from './../third/third';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  token: string = "Afs569_sf09l";
  firstname: string = "Daniel"; 
  constructor(public navCtrl: NavController) {

  }

  pushSecondPage() {
    this.navCtrl.push(SecondPage);
  }

  rootSecondPage() {
    this.navCtrl.setRoot(SecondPage);
  }

  pushThirdPage() {
    this.navCtrl.push(ThirdPage, {
      token: this.token,
      firstname: this.firstname
    });
  }



}
