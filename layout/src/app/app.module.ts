import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { BluetoothDeviceListModalPage } from './../pages/bluetooth-device-list-modal/bluetooth-device-list-modal';
import { BluetoothPrinterPage } from './../pages/bluetooth-printer/bluetooth-printer';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { MapPage } from './../pages/map/map';
import { ScannerPage } from './../pages/scanner/scanner';
import { SettingsPage } from './../pages/settings/settings';
import { DeliveryPage } from './../pages/delivery/delivery';
import { PartnerPage } from './../pages/partner/partner';
import { SigninPage } from './../pages/signin/signin';
import { WelcomePage } from './../pages/welcome/welcome';
import { SearchPage } from './../pages/search/search';
import { ProfilePage } from './../pages/profile/profile';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, Injector } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { TabsPage } from '../pages/tabs/tabs';
import { AboutPage } from '../pages/about/about';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SignupPage } from '../pages/signup/signup';

//Provider & Http needed for REST-Calls
import { RestProvider } from '../providers/rest/rest';
import { HttpClientModule } from '@angular/common/http';

//Imports for storage
import { StorageProvider } from '../providers/storage/storage';
import { IonicStorageModule } from '@ionic/storage';

//Toast
import { Toast } from '@ionic-native/toast';
import { ToastProvider } from '../providers/toast/toast';

//Barcode Scanner
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

//Geolocation
import { Geolocation } from '@ionic-native/geolocation'
import { GeocoderProvider } from '../providers/geocoder/geocoder';
import { PlacesProvider } from '../providers/places/places';
import { BluetoothProvider } from '../providers/bluetooth/bluetooth';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    AboutPage,
    ProfilePage,
    SearchPage,
    WelcomePage,
    SigninPage,
    SignupPage,
    PartnerPage,
    DeliveryPage,
    ProfilePage,
    SettingsPage,
    ScannerPage,
    MapPage,
    BluetoothPrinterPage,
    BluetoothDeviceListModalPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    AboutPage,
    ProfilePage,
    SearchPage,
    WelcomePage,
    SigninPage,
    SignupPage,
    PartnerPage,
    DeliveryPage,
    ProfilePage,
    SettingsPage,
    ScannerPage,
    MapPage,
    BluetoothPrinterPage,
    BluetoothDeviceListModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    StorageProvider,
    Toast,
    ToastProvider,
    BarcodeScanner,
    Geolocation,
    GeocoderProvider,
    NativeGeocoder,
    PlacesProvider,
    BluetoothProvider,
    BluetoothSerial
  ]
})
export class AppModule {
  static injector: Injector;

    constructor(injector: Injector) {    
        // Make the injector to be available in the entire module
        AppModule.injector = injector;    
    }
}
