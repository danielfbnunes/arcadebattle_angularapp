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

@NgModule({
  declarations: [
    AppComponent,
    GeneralStatisticsComponent,
    AllDoctorsComponent,
    DoctorStatisticsComponent,
    AllGamesComponent,
    AddDoctorComponent
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
