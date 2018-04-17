import { DeviceListModalPage } from './../pages/device-list-modal/device-list-modal';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BluetoothProvider } from '../providers/bluetooth/bluetooth';

import { BluetoothSerial } from '@ionic-native/bluetooth-serial'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DeviceListModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DeviceListModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BluetoothProvider,
    BluetoothSerial
  ]
})
export class AppModule {}
