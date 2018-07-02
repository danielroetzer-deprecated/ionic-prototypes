import { BluetoothPrinterPage } from './../pages/bluetooth-printer/bluetooth-printer';
import { ToastProvider } from './../providers/toast/toast';
import { MapPage } from './../pages/map/map';
import { ScannerPage } from './../pages/scanner/scanner';
import { AboutPage } from './../pages/about/about';
import { StorageProvider } from './../providers/storage/storage';
import { WelcomePage } from './../pages/welcome/welcome';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from './../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = WelcomePage;

  pages: Array<{title: string, component: any, icon: string, type: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private store: StorageProvider, private toast: ToastProvider) {
    this.initializeApp();

    // List of pages, which are accessable via the sidemenu
    this.pages = [
      { title: 'Home', component: TabsPage, icon: "home", type: "root"},
      { title: 'About Us', component: AboutPage, icon: "information-circle", type: "push"},
      { title: 'Settings', component: SettingsPage, icon: "settings", type: "push"},
      { title: 'QR-Code Scanner', component: ScannerPage, icon: "qr-scanner", type: "push"},
      { title: 'Map', component: MapPage, icon: "navigate", type: "push"},
      { title: 'Bluetooth Printer', component: BluetoothPrinterPage, icon: "bluetooth", type: "push"},
      { title: 'Logout', component: undefined, icon: "log-out", type: "logout"}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  //When a sidemenu item is clicked
  openPage(page) {
    //this.nav.push(page.component);
    if (page.type == 'push') {
      this.nav.push(page.component);
    } else if (page.type == 'root') {
      this.nav.setRoot(page.component);
    } else if (page.type == 'logout') {
      this.logout();
    }
  }

  //Clicked sidemenu items, which should be the new ROOT instead of being pushed onto the stack
  setRootPage(page) {
    if (page=='TabsPage') {
      this.nav.setRoot(TabsPage);
    }else if (page=='xxx') {
      
    }
  }

  logout() {
    this.store.removeData('login');
    this.store.removeData('Coordinates');
    this.toast.showToastAngular('Logging out...', 3000, 'bottom');
    this.nav.setRoot(WelcomePage);
  }
}
