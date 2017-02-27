import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { EventService } from '../../services/events.service';
import { Network, NativeStorage } from 'ionic-native';
import { NetworkService } from '../../services/network.service';
import { EventDetailPage } from '../event-detail/event-detail';

/*
  Generated class for the Foryou page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-foryou',
  templateUrl: 'foryou.html',
})
export class ForyouPage {
	events: any;
	internetStatus: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private eventService: EventService,
  	public toastCrl: ToastController, public loadingCtrl: LoadingController) {

    NativeStorage.getItem('events').
    then(
      data => {
        this.events = data;
      },
      error => {
        console.log("Error:", error);
      }
    )

  	Network.onDisconnect().subscribe(() => {
  		this.internetStatus = false;

  		let toast = this.toastCrl.create({
  			message: 'Internet Disconnected',
  			duration: 3000
  		});
      console.log(this.internetStatus);
  		toast.present();
      // NativeStorage.getItem('events').then(data => {
      //   this.events = data;
      // })
  	});

    Network.onConnect().subscribe(() => {
      console.log("go online");
    });

    if(Network.type != 'none') {
      this.getEvents();
      console.log("load from online");
    } else {
      NativeStorage.getItem('events')
      .then(data => {
        this.events = data;
        console.log("load from native storage");
      })
    }

  	// if(this.internetStatus) {
   //    console.log(this.internetStatus);
  	// 	this.getEvents();
  	// } else {
  	// 	NativeStorage.getItem('events')
  	// 	.then(data => {
  	// 		this.events = data;
  	// 	});
  	// }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForyouPage');
  }

  getEvents() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait ...',
    });
    // loading.present();
  	this.eventService.getEvents().subscribe(response => {
      // loading.dismiss();
  		this.events = response.events;
  		NativeStorage.setItem('events', this.events).then(
  			() => console.log('Stored item'),
  			error => console.log('Error stroing item', error)
  		);

  	});
  }

  toDetail(event) {
    this.navCtrl.setRoot(EventDetailPage, {
      event: event
    })
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.eventService.getEvents().subscribe(response => {
      // loading.dismiss();
      this.events = response.events;
      refresher.complete();
      NativeStorage.setItem('events', this.events).then(
        () => {
          console.log('Stored item');
        },
        error => console.log('Error stroing item', error)
      );

    });
  }
}
