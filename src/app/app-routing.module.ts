import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoteComponent } from './components/vote/vote.component';
import { ResultsComponent } from './components/results/results.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/vote',
    pathMatch: 'full'
  },
  {
    path: 'vote',
    children: [],
    component: VoteComponent
  }, 
  {
    path: 'results',
    children: [],
    component: ResultsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
