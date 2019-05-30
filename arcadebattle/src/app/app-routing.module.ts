import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GeneralStatisticsComponent} from './general-statistics/general-statistics.component';
import {AllDoctorsComponent} from './all-doctors/all-doctors.component';
import {DoctorStatisticsComponent} from './doctor-statistics/doctor-statistics.component';
import {AllGamesComponent} from './all-games/all-games.component';
import {AddDoctorComponent} from './add-doctor/add-doctor.component';
import {AllAdminsComponent} from './all-admins/all-admins.component';
import {AdminStatisticsComponent} from './admin-statistics/admin-statistics.component';
import {AllPatientsComponent} from './all-patients/all-patients.component';
import {AddAdminComponent} from './add-admin/add-admin.component';
import {AddGameComponent} from './add-game/add-game.component';
import {AddPatientComponent} from './add-patient/add-patient.component';

const routes: Routes = [
    {path: '', component: GeneralStatisticsComponent},
    {path: 'general_statistics', component: GeneralStatisticsComponent},
    {path: 'all_doctors', component: AllDoctorsComponent},
    {path: 'all_admins', component: AllAdminsComponent},
    {path: 'all_games', component: AllGamesComponent},
    {path: 'all_patients', component: AllPatientsComponent},
    {path: 'doctor_statistics/:email', component: DoctorStatisticsComponent},
    {path: 'admin_statistics/:email', component: AdminStatisticsComponent},
    {path: 'add_doctor', component: AddDoctorComponent},
    {path: 'add_admin', component: AddAdminComponent},
    {path: 'add_game', component: AddGameComponent},
    {path: 'add_patient', component: AddPatientComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
