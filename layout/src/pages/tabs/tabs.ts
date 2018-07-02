import { Component } from '@angular/core';

import { PartnerPage } from './../partner/partner';
import { SearchPage } from '../search/search';
import { HomePage } from './../home/home';
import { ProfilePage } from './../profile/profile';
import { DeliveryPage } from './../delivery/delivery';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SearchPage;
  tab3Root = PartnerPage;
  tab4Root = DeliveryPage;
  tab5Root = ProfilePage;

  constructor() {

  }
}
