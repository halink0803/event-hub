import { Injectable } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from 'ionic-native';

@Injectable()

export class AuthService {
	user: any;
	userReady: boolean = false;
	constructor(public authService: AuthService) {}

	login() {

	}

	fbLogin() {
		
	}
}