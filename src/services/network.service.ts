import { Injectable } from 'angular2/core';
import { Network } from 'ionic-native';
import { NavController } from 'ionic-angular';


@Injectable()

export class NetworkService {
	constructor(public nav: NavController) {}

	noConection() {
		return (Network.type == 'none');
	}

	
}
