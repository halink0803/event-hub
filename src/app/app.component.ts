import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav,  AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { FeedsPage } from '../pages/feeds/feeds';
import { LoginPage } from '../pages/login/login';
import { Push } from 'ionic-native';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = FeedsPage;
  menus : Array<{title: string, component: any}>;

  constructor(public platform: Platform, public menu: MenuController, public alertCtrl: AlertController) {

    this.menus = [
      {title: 'Login', component: LoginPage},
      {title: 'Settings', component: FeedsPage}
    ]

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.initPushNotification();
    });
  }

  initPushNotification() {
    if(!this.platform.is('cordova')) {
      console.warn("Push noitification not initialized. Cordova is not available - Run in physical device");
      return;
    }
    let push = Push.init({
      android: {
        senderID: "972428714274"
      },
      ios: {
        alert: "true",
        badge: false,
        sound: "true"
      },
      windows: {}
    });

    push.on('registration', (data) => {
      console.log("device token ->", data.registrationId);
      //TODO - send device token to server
    });
    push.on('notification', (data) => {
      console.log('message', data.message);
      let self = this;

      if(data.additionalData.foreground) {
        let confirmAlert = this.alertCtrl.create({
          title: 'New Notification',
          message: data.message,
          buttons: [{
            text: 'Ignore',
            role: 'cancel'
          }, {
            text: 'View',
            handler: () => {
              self.nav.push(FeedsPage, {message: data.message})
            }
          }]
        });
        confirmAlert.present();
      } else {
        self.nav.push(FeedsPage, {message: data.message});
        console.log("Push notification clicked");
      }
    });
    push.on('error', (e) => {
      console.log(e.message);
    });
  }

  openPage(page) {

    this.menu.close();

    this.nav.push(page.component);
  }
}
