import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';


@Injectable()
export class VoteService {

  constructor(private http: Http) { };

  getSpeakers(): Observable<any> {
  	return this.http.get('../assets/json/feedback_0.json');
  };   

}
