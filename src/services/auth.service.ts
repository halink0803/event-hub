import { Injectable } from '@angular/core';
import { NativeStorage } from 'ionic-native';
import { Observable, Subject } from 'rxjs';

@Injectable()

export class AuthService {
	public userChange = new Subject<any>();

	constructor() {}

	login() {

	}

	updateUser(data) {
		this.userChange.next(data);
	}

	fbLogin() {
		
	}
}