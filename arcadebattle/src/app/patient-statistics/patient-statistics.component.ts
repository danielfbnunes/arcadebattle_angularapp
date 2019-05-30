import { Component, OnInit } from '@angular/core';
import {ArcadebattleService} from '../arcadebattle.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-patient-statistics',
  templateUrl: './patient-statistics.component.html',
  styleUrls: ['./patient-statistics.component.css']
})
export class PatientStatisticsComponent implements OnInit {

  patient: any;
  patientGestures: any;
  imagePath: any;

  constructor(private arcadeBattleService: ArcadebattleService, private sanitizer: DomSanitizer,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.getPatient();
  }

  getPatient(): void {
    const email = this.route.snapshot.paramMap.get('email');
    this.arcadeBattleService.get_profile(email)
        .subscribe(
            data => {
              this.patient = data.data;
              this.imagePath = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
                  + this.patient.photo_b64);
              this.getPatientGestures(email);
            });
  }

  getPatientGestures(username: string) {
    this.arcadeBattleService.get_gestures(username)
        .subscribe(
            data => {
              console.log(data);
              this.patientGestures = data;
            });
  }

}
