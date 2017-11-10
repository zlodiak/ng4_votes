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
          MatButtonModule } from '@angular/material';

import { AppComponent } from './app.component';
import { VoteService } from './services/vote.service';
import { VoteComponent } from './components/vote/vote.component';
import { ResultsComponent } from './components/results/results.component';


@NgModule({
  declarations: [
    AppComponent,
    VoteComponent,
    ResultsComponent
  ],
  imports: [
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
  	VoteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
