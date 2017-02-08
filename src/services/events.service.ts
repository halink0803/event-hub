import {Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class EventService{
	http: any;
	baseUrl: String;

	constructor(http:Http) {
		this.http = http;
		this.baseUrl = 'https://www.eventbriteapi.com/v3/events/search/';
	}

	getEvents() {
		let params = new URLSearchParams;
		params.set('token', "W5IVMFZKHEN7YRZA64K7");
		params.set('categories', "101");
		return this.http.get(this.baseUrl, {
			search: params
		})
			.map(res => res.json());
	}
}