import { Component, OnInit } from '@angular/core';

import { VoteService } from '../../services/vote.service';


@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

	private votes: any[] = [];
	private isVisibleForm: boolean = true;
  private answer: Object = {};
	private answers: Object = {};	

  constructor(private voteService: VoteService) { }

  ngOnInit() {
  	this.getVotes();
  }

  private getVotes(): void {
    this.voteService.getVotes().subscribe(
      data => {   
        //console.log(data);  
        let voteRaw = JSON.parse(data._body)['values'];
        let votes: any[] = [];

        for(var prop in voteRaw) {
          if (!voteRaw.hasOwnProperty(prop)) continue;
          voteRaw[prop].id = prop;
          voteRaw[prop].order = +voteRaw[prop].order;
          voteRaw[prop].answers_type = +voteRaw[prop].answers_type;
          voteRaw[prop].mandatory = +voteRaw[prop].mandatory;
          votes.push(voteRaw[prop]);
        }
      
        this.votes = votes;                                                                                                                           
        console.log(this.votes); 
      }, 
      err => {
        console.log('err')         
      });    
  };    

}
