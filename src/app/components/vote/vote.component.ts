import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material';

import { InfoDialogComponent } from '../../dialogs/info-dialog/info-dialog.component';
import { VoteService } from '../../services/vote.service';
import { ResultsService } from '../../services/results.service';


@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

	private votes: any[] = [];
  private answer: Object = {};
	private answers: Object = {};	
  private form: Object = {};  
  private isVoted: boolean = localStorage.isVoted ? true : false;
  private noValidIdsArr: string[] = [];

  constructor(private voteService: VoteService, 
              private resultsService: ResultsService, 
              private matDialog: MatDialog) {}

  ngOnInit() {
  	this.getVotes();
  }

  private getVotes(): void {
    this.voteService.getVotes().subscribe(
      data => {   
        //console.log(data);  
        let voteRaw = JSON.parse(data._body);
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
            question_mandatory: voteRaw[prop].mandatory,
            question_type: voteRaw[prop].answers_type,
            answer_cb: [],
            answer_rb: '',
            answer_select: '',
            answer_textarea: '',
            answer_slider: ''                        
          };
        }
      
        this.votes = votes;                                                                                                                           
        //console.log(this.votes); 
      }, 
      err => {
        console.log('err')         
      });    
  };   

  private sendAnswers(form) {
    let sendArr: any[] = [];
    let line: Object = {};
    let lineObj: Object = {};
    let lineId = Date.now() + '_' +performance.now();

    for(var prop in form) {
      if (!form.hasOwnProperty(prop)) continue;

      lineObj = {
        id: form[prop].question_id,
        title: form[prop].question_title,
        mandatory: form[prop].question_mandatory
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

    this.checkValidForm(lineId, line);

    if(this.noValidIdsArr.length) {
      // validation false
      this.matDialog.open(InfoDialogComponent, {
        width: '300px',
        hasBackdrop: true,
        data: { title: 'Ошибка!', message: 'Не все обязательные поля заполнены.' }
      });      
    } else {
      // validation ok
      this.resultsService.addResult(lineId, line[lineId]);
      this.isVoted = true;
      localStorage.isVoted = 'true';             

      setTimeout(() => {
        this.matDialog.open(InfoDialogComponent, {
          width: '300px',
          hasBackdrop: true,
          data: { title: 'Спасибо!', message: 'Ваши данные отправлены.' }
        });        
      }, 0);
    }
  }; 

  private checkValidForm(lineId, line) {
    this.noValidIdsArr = [];
    line[lineId].forEach((question) => {
      if( (typeof question.answer == 'object' && !question.answer.length) ||
          (typeof question.answer == 'string' && !question.answer.length) ||
          (typeof question.answer == 'number' && !question.answer)
      ) {
        if(question.mandatory != 0) { this.noValidIdsArr.push(question.id); }        
      }
    });
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
