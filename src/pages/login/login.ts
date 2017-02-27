import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Facebook, NativeStorage } from 'ionic-native';
import { UserPage } from '../user/user';
import { ToastController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
   FB_APP_ID: number = 194426564367310;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public authService: AuthService) {
    // Facebook.browserInit(this.FB_APP_ID, "v2.8");
    NativeStorage.getItem('user')
    .then(function(data) {
      navCtrl.setRoot(UserPage);
    }, function(error) {
      console.log("Error: ", error);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  doLogin() {
    
  }

  fbLogin() {
  	let permissions = new Array();
  	let nav = this.navCtrl;
  	permissions = ['public_profile', 'email'];

  	Facebook.login(permissions)
  	.then(function(response) {
  		let userId = response.authResponse.userID;
  		let params = new Array();
      console.log(userId);
  		Facebook.api('/me?fields=name,gender,email', params)
  		.then(function(user) {
  			user.avatar = "https://graph.facebook.com/" + userId + "/picture?type=large";
        console.log("What the hell???");
        let newUser = {
          name: user.name,
          gender: user.gender,
          avatar: user.avatar,
          email: user.email
        };

  			NativeStorage.setItem('user', newUser)
  			.then(function() {
          console.log("Stored user");
          this.authService.updateUser(newUser);
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
