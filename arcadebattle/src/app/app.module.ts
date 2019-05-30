import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GeneralStatisticsComponent } from './general-statistics/general-statistics.component';
import {ArcadebattleService} from './arcadebattle.service';
import {HttpClientModule} from '@angular/common/http';
import { AllDoctorsComponent } from './all-doctors/all-doctors.component';
import { DoctorStatisticsComponent } from './doctor-statistics/doctor-statistics.component';
import { AllGamesComponent } from './all-games/all-games.component';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { ExpandableListModule } from 'angular2-expandable-list';
import { AllAdminsComponent } from './all-admins/all-admins.component';
import { AdminStatisticsComponent } from './admin-statistics/admin-statistics.component';
import { AllPatientsComponent } from './all-patients/all-patients.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { AddGameComponent } from './add-game/add-game.component';
import { AddPatientComponent } from './add-patient/add-patient.component';

@NgModule({
  declarations: [
    AppComponent,
    GeneralStatisticsComponent,
    AllDoctorsComponent,
    DoctorStatisticsComponent,
    AllGamesComponent,
    AddDoctorComponent,
    AllAdminsComponent,
    AdminStatisticsComponent,
    AllPatientsComponent,
    AddAdminComponent,
    AddGameComponent,
    AddPatientComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ExpandableListModule
  ],
  providers: [ArcadebattleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
