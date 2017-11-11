import { Injectable } from '@angular/core';

@Injectable()
export class ResultsService {

  constructor() { }

  private getResults() {
  	return localStorage.results ? JSON.parse(localStorage.results) : {};
  };

  private addResult(lineId, result) {
  	var results = this.getResults();
  	results[lineId] = result;
		localStorage.results = JSON.stringify(results);
  };  

}
