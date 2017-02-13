import { Component , ViewChild, ElementRef} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

declare var google;

/*
  Generated class for the Location page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-location',
  templateUrl: 'location.html'
})
export class LocationPage {
	@ViewChild('map') mapElement: ElementRef;
	map: any;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  	this.loadMap();
    console.log('ionViewDidLoad LocationPage');
  }

  ngOnInit() {
  }

  loadMap() {
  	console.log("start...")
  	let latLng = new google.maps.LatLng(-34.9290, 138.6010);

  	let mapOptions = {
  		center: latLng,
  		zoom: 15,
  		mapTypeId: google.maps.MapTypeId.ROADMAP
  	}

  	this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  	console.log("end: ",this.map);
  }

  addMarker() {

  	let marker = new google.maps.Marker({
  		map: this.map,
  		animation: google.maps.Animation.DROP,
  		position: this.map.getCenter()
  	});

  	let content = "<h4>Information</h4>";

  	this.addInfoWindow(marker,  content);
  }

  addInfoWindow(marker, content) {

  	let infoWindow = new google.maps.InfoWindow({
  		content: content
  	});

  	google.maps.event.addListener(marker, 'click', () => {
  		infoWindow.open(this.map, marker);
  	});
  }

}
