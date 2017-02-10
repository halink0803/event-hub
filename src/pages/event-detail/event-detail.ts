import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the EventDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html'
})
export class EventDetailPage {
	event: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.event = this.navParams.get('event');
  	console.log(this.event);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetailPage');
  }

}