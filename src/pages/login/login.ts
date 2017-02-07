import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Facebook, NativeStorage, Network } from 'ionic-native';
import { UserPage } from '../user/user';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

// watch network for a disconnect
let disconnectSubscription = Network.onDisconnect().subscribe(() => {
  console.log('network was disconnected :-(');
});


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  doLogin() {
    
  }

  fbLogin() {
  	let permissions = new Array();
  	let nav = this.navCtrl;
  	permissions = ['public_profile'];

  	Facebook.login(permissions)
  	.then(function(response) {
  		let userId = response.authResponse.userID;
  		let params = new Array();

  		Facebook.api('/me?fields=name,gender', params)
  		.then(function(user) {
  			user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";

  			NativeStorage.setItem('user', {
  				name: user.name,
  				gender: user.gender,
  				picture: user.picture
  			})
  			.then(function() {
  				nav.push(UserPage);
  			}, function(error) {
  				console.log(error);
  			})
  		})
  	}, function(error) {
  		console.log(error);
  	});
  }
}
