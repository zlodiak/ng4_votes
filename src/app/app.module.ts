import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import {  MatCardModule,
          MatRadioModule,
          MatSliderModule,
          MatCheckboxModule,
          MatSelectModule,
          MatButtonModule,
          MatDialogModule } from '@angular/material';

import { OrderModule } from 'ngx-order-pipe';          

import { AppComponent } from './app.component';
import { VoteService } from './services/vote.service';
import { ResultsService } from './services/results.service';
import { VoteComponent } from './components/vote/vote.component';
import { ResultsComponent } from './components/results/results.component';
import { FormattedAnswerPipe } from './pipes/formatted-answer.pipe';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { InfoDialogComponent } from './dialogs/info-dialog/info-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    VoteComponent,
    ResultsComponent,
    FormattedAnswerPipe,
    PageNotFoundComponent,
    InfoDialogComponent
  ],
  imports: [
    MatDialogModule,
    OrderModule,
    MatButtonModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatSliderModule,
    FormsModule,
    MatRadioModule,
    MatCardModule,    
    HttpModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    ResultsService,
  	VoteService
  ],
  entryComponents: [
    InfoDialogComponent
  ],   
  bootstrap: [AppComponent]
})
export class AppModule { }
