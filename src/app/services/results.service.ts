import { Injectable } from '@angular/core';

@Injectable()
export class ResultsService {

  constructor() { }

  private getResults() {
  	return localStorage.results ? JSON.parse(localStorage.results) : {};
  };

  private addResult(lineId, line) {
  	var results = this.getResults();
  	results[lineId] = line[lineId];
		localStorage.results = JSON.stringify(results);
  };  

}
