import { ToastProvider } from './../../providers/toast/toast';
import { DisableSideMenu } from './../../custom_decorators/sidemenu_disable.decorator';
import { TabsPage } from './../tabs/tabs';
import { RestProvider } from './../../providers/rest/rest';
import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';

@DisableSideMenu()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  username: string = 'd.roetzer@it-center.at';
  password: string = 'daniel';
  error: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestProvider, private store: StorageProvider, private toast: ToastProvider) {
    
  }

  //Gets called, when the User clicks the Button to Sign In
  onSubmit() {
    this.signIn();
  }
  
  //Call function from the RestProvider, which checks the given login information
  signIn() {
    this.rest.checkLoginInformation(this.username, this.password)

    .then(data => { //Executed on resolve()

      //Save login data
      this.store.saveLoginData(this.username, this.password, data['token']);
      
      this.toast.showToastAngular('Successfully logged in as: ' + this.username, 3000, 'middle');
      this.navCtrl.setRoot(TabsPage);

    }, err => { //Executed on reject()
      this.error = err;
    }).catch(err => {
      console.log(err);
    });
  }

}
