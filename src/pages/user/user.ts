import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Facebook, NativeStorage } from 'ionic-native';

/*
  Generated class for the User page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {
  user: any;
  userReady: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }

  ionViewCanEnter() {
  	let env = this;
  	NativeStorage.getItem('user')
  	.then(function(data){
      console.log(JSON.stringify(data));
  		env.user = {
  			name: data.name,
  			gender: data.gender,
  			avatar: data.avatar,
        email: data.email
  		};
  		env.userReady = true;
  	}, function(error) {
  		console.log(error);
  	});
  }

  fbLogout() {
  	var nav = this.navCtrl;
  	Facebook.logout()
  	.then(function(response) {
  		NativeStorage.remove('user');
  		nav.push(LoginPage);
  	}, function(error) {
  		console.log(error);
  	});
  }

}
