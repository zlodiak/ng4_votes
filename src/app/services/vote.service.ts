import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Config } from '../config';


@Injectable()
export class VoteService {

  constructor(private http: Http) { };

  getVotes(): Observable<any> {
  	return this.http.get(Config.host + 'assets/json/feedback_0.json');
  };   

}
