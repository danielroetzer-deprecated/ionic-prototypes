import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { NFC, Ndef } from '@ionic-native/nfc';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  payload: string;

  platform: string = 'not sure';

  ndefListener;
  beginSession;

  constructor(public navCtrl: NavController, private nfc: NFC, private ndef: Ndef, private plt: Platform) {
    if (this.plt.is('ios')) {
      this.platform = 'IOS';
    } else if (this.plt.is('android')) {
      this.platform = 'Android';
    } else if (this.plt.is('windows')) {
      this.platform = 'Windows';
    }
  }

  check() {
    this.nfc.enabled().then(success => {
      console.log('checkEnabled() success: ' + success);

    }, failure => {
      console.error('checkEnabled() failure: ' + failure);

    }).catch(err => {
      console.error('checkEnabled() error: ' + err);

    });
  }

  init() {
    this.ndefListener = this.nfc.addNdefListener((success) => {
      console.log('Attached NdefListener in init() -->nfc.addNdefListener(success) ' +success);

    }, (err) => {
      console.error('error adding ndef listener in init() ' + err);
    }).subscribe((event) => {
      console.log('discovered ndef tag in init(): ' + JSON.stringify(event));
      this.payload = this.nfc.bytesToString(event.tag.ndefMessage[0].payload);
    });
  }

  begin() {
    this.beginSession = this.nfc.beginSession((success) => {
      console.log('successfully executed beginSession(): ' + success);
    }, (err) => {
      console.error('error executing beginSession(): ' + err);
    }).subscribe((event) => {
      console.log('discovered ndef tag in begin(): ' + JSON.stringify(event));
      console.log('typeof(event): ' + typeof(event));
      this.payload = this.nfc.bytesToString(event.tag.ndefMessage[0].payload);
    });
  }

  begin2() {
    this.beginSession = this.nfc.beginSession((success) => {
      console.log('successfully executed beginSession(): ' + success);

      this.ndefListener = this.nfc.addNdefListener((success) => {
        console.log('Attached NdefListener in init() -->nfc.addNdefListener(success) ' +success);

      }, (err) => {
        console.error('error adding ndef listener in init() ' + err);
      }).subscribe((event) => {
        console.log('discovered ndef tag in init(): ' + JSON.stringify(event));
        this.payload = this.nfc.bytesToString(event.tag.ndefMessage[0].payload);
      });
    }, (err) => {
      console.error('error executing beginSession(): ' + err);
    });/*.subscribe((event) => {
      console.log('discovered ndef tag in begin(): ' + JSON.stringify(event));
      console.log('typeof(event): ' + typeof(event));
      this.payload = this.nfc.bytesToString(event.tag.ndefMessage[0].payload);
    });*/
  }


  doRefresh(refresher) {
    console.log('refresher started... ');

    this.clear(() => {
      console.log('...refresher finished!')
      refresher.complete();
    });
  }

  clear(_callback) {
    this.removeListener();
    this.removeSession();

    console.log('setTimeout(2000) started...');
    setTimeout(() => {
      console.log('... setTimeout(2000) finished');
      _callback();
    }, 2000);

  }

  removeListener() {
    if (this.ndefListener != undefined || this.ndefListener != null) {
      this.ndefListener.unsubscribe();
      this.ndefListener = undefined;
      console.log('removed listener');
    } else {
      console.log('listener was already removed or never initialized');
    }
  }

  removeSession() {
    if (this.beginSession != undefined || this.beginSession != null) {
      this.beginSession.unsubscribe();
      this.beginSession = undefined;
      console.log('removed session');
    } else {
      console.log('session was already removed or never initialized');
    }
  }

  ionViewWillLeave() {
    this.removeListener();
    this.removeSession();
  }

}
