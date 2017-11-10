import { Component, OnInit } from '@angular/core';

import { VoteService } from '../../services/vote.service';
//import { AnswerUnit } from '../../types/answer-unit';


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
  private form: Object = {};  

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

          this.form[prop] = {
            question: voteRaw[prop].title,
            answer_cb: [],
            answer_rb: '',
            answer_select: '',
            answer_textarea: '',
            answer_slider: ''            
          };
        }
      
        this.votes = votes;                                                                                                                           
        console.log(this.votes); 
        console.log('form', this.form); 
      }, 
      err => {
        console.log('err')         
      });    
  };   

  private check(form) {
  };

  private sendAnswers(form) {
    console.log('form', form); 
  }; 

  private fillForm(line, value) {
    /*if(line.answers_type == 1) {
      console.log(line.answers_type, line.id);
      this.form[line.id]['answer_rb'] = value;
    }*/
    
  };

}
