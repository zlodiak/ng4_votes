import { Component, OnInit } from '@angular/core';

import { ResultsService } from '../../services/results.service';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

	private results: any[] = [];

  constructor(private resultsService: ResultsService) { }

  ngOnInit() {
  	this.getResults();
  }

  private getResults() {
  	let resultsObj = this.resultsService.getResults();
  	let resultsArr = [];

    for(let prop in resultsObj) {
      if (!resultsObj.hasOwnProperty(prop)) continue;
      resultsArr.push(resultsObj[prop]);
    }  	

    this.results = resultsArr;
    console.log(this.results);
  };

}
