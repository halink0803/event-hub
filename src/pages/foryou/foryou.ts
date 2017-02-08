import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { EventService } from '../../services/events.service';
import { Network, NativeStorage } from 'ionic-native';

/*
  Generated class for the Foryou page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-foryou',
  templateUrl: 'foryou.html'
})
export class ForyouPage {
	events: any;
	internetStatus: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private eventService: EventService,
  	public toastCrl: ToastController) {

  	Network.onDisconnect().subscribe(() => {
  		this.internetStatus = false;

  		let toast = this.toastCrl.create({
  			message: 'Internet Disconnected',
  			duration: 3000
  		});
  		toast.present();
  	});

  	// Network.onchange().subscribe(() => {
  	// 	if(!this.internetStatus) {
  	// 		this.getEvents();
  	// 		this.internetStatus = true;
  	// 	}
  	// });

  	if(this.internetStatus) {
  		this.getEvents();
  	} else {
  		NativeStorage.getItem('events')
  		.then(data => {
  			this.events = data;
  		});
  	}

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForyouPage');
  }

  getEvents() {
  	this.eventService.getEvents().subscribe(response => {
  		this.events = response.events;
  		NativeStorage.setItem('events', this.events).then(
  			() => console.log('Stored item'),
  			error => console.log('Error stroing item', error)
  		);

  	});
  }

}
