import { ToastProvider } from './../../providers/toast/toast';
import { DisableSideMenu } from './../../custom_decorators/sidemenu_disable.decorator';
import { StorageProvider } from './../../providers/storage/storage';
import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { SigninPage } from '../signin/signin';
import { SignupPage } from '../signup/signup';


@DisableSideMenu()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})

export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private store: StorageProvider, private toast: ToastProvider) {
    
    //Lookup the storage for login information
    this.store.getLoginData().then((data) => {
      if(data){
        this.toast.showToastAngular('Successfully logged in as: ' + data['username'], 3000, 'middle');
        this.navCtrl.setRoot(TabsPage);
      }
    });
  }


  skipLogin() {
    this.navCtrl.setRoot(TabsPage);
  }

  signIn() {
    this.navCtrl.push(SigninPage);
  }

  signUp() {
    this.navCtrl.push(SignupPage);
  }

}
