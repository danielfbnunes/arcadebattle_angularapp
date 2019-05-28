import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GeneralStatisticsComponent} from './general-statistics/general-statistics.component';
import {AppComponent} from './app.component';

const routes: Routes = [
  {path: 'general_statistics', component: GeneralStatisticsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
