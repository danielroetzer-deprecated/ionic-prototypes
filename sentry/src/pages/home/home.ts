import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  produceError() {
    throw new Error('I am a bug... 🐛');
  }

  produceError2() {
    throw new Error('Project: sentry-test, home.ts, produceError2 ...🐛');
  }

}
