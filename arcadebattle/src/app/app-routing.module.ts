import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GeneralStatisticsComponent} from './general-statistics/general-statistics.component';
import {AllDoctorsComponent} from './all-doctors/all-doctors.component';
import {DoctorStatisticsComponent} from './doctor-statistics/doctor-statistics.component';
import {AllGamesComponent} from './all-games/all-games.component';

const routes: Routes = [
    {path: '', component: GeneralStatisticsComponent},
    {path: 'general_statistics', component: GeneralStatisticsComponent},
    {path: 'all_doctors', component: AllDoctorsComponent},
    {path: 'doctor_statistics/:email', component: DoctorStatisticsComponent},
    {path: 'all_games', component: AllGamesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
