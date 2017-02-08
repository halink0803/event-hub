import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { FeedsPage } from '../pages/feeds/feeds';
import { LoginPage } from '../pages/login/login';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = FeedsPage;
  menus : Array<{title: string, component: any}>;

  constructor(platform: Platform, public menu: MenuController, ) {

    this.menus = [
      {title: 'Login', component: LoginPage},
      {title: 'Settings', component: FeedsPage}
    ]

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {

    this.menu.close();

    this.nav.push(page.component);
  }
}
