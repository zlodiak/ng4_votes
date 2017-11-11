import { Component, OnInit } from '@angular/core';

import { VoteService } from '../../services/vote.service';
import { ResultsService } from '../../services/results.service';


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

  constructor(private voteService: VoteService, private resultsService: ResultsService) { }

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
            question_id: prop,
            question_title: voteRaw[prop].title,
            question_type: voteRaw[prop].answers_type,
            answer_cb: [],
            answer_rb: '',
            answer_select: '',
            answer_textarea: '',
            answer_slider: ''                        
          };
        }
      
        this.votes = votes;                                                                                                                           
        console.log(this.votes); 
      }, 
      err => {
        console.log('err')         
      });    
  };   

  private sendAnswers(form) {
    //console.log('form', form); 

    let sendArr: any[] = [];
    let line: Object = {};
    let lineObj: Object = {};
    let lineId = Date.now() + '_' +performance.now();

    for(var prop in form) {
      if (!form.hasOwnProperty(prop)) continue;

      lineObj = {
        id: form[prop].question_id,
        title: form[prop].question_title,
      };      

      if(form[prop].question_type == 0) {
        lineObj['answer'] = form[prop].answer_cb
      } else if(form[prop].question_type == 1) {
        lineObj['answer'] = form[prop].answer_rb
      } else if(form[prop].question_type == 2) {
        lineObj['answer'] = form[prop].answer_select
      } else if(form[prop].question_type == 3) {
        lineObj['answer'] = form[prop].answer_textarea
      } else if(form[prop].question_type == 4) {
        lineObj['answer'] = '' + form[prop].answer_slider
      };   

      sendArr.push(lineObj);  
      line[lineId] = sendArr;
    }

    this.resultsService.addResult(lineId, line)    
  }; 

  private toggleCB(v_id, answer) {
    let pos = this.form[v_id].answer_cb.indexOf(answer.trim());
    
    if(pos == -1) {
      this.form[v_id].answer_cb.push(answer.trim());
    } else {
      this.form[v_id].answer_cb.splice(pos, 1);      
    }
  };

}
