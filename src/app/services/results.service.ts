import { Injectable } from '@angular/core';

@Injectable()
export class ResultsService {

  constructor() { }

  getResults() {
  	return localStorage.results ? JSON.parse(localStorage.results) : {};
  };

  addResult(lineId, result) {
  	var results = this.getResults();
  	results[lineId] = result;
		localStorage.results = JSON.stringify(results);
  };  

}
