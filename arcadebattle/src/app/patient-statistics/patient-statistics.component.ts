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

    gestures
    removeName: any;
    removeUsername: any;
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

    getImagePath(g: any) {
        return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64, '
            + g);
    }

  getPatientGestures(username: string) {
    this.arcadeBattleService.get_gestures(username)
        .subscribe(
            data => {
              console.log(data);
              this.patientGestures = data.data;
            });
  }

    updateGestureStatisticModal(g) {
        console.log(g);
        (<any> document.getElementById('gestureStatisticsName')).value = g.name;
        (<any> document.getElementById('gestureStatisticsRepetitions')).value = g.repetitions;

        (<any> document.getElementById('gestureStatisticsName_card')).innerHTML = g.name;
        (<any> $('#gestureStatisticPic')).attr('src', 'data:image/png;base64,' + g.image);


        (<any> $('#gestureStatisticsDefaultDifficulty')).attr('aria-valuenow', '' + g.default_difficulty);
        (<any> document.getElementById('gestureStatisticsDefaultDifficulty')).style.width = g.default_difficulty + '%';
        (<any> document.getElementById('gestureStatisticsDefaultDifficulty')).innerHTML = g.default_difficulty + '%';

        (<any> $('#gestureStatisticsDefaultDifficulty')).removeClass();
        (<any> $('#gestureStatisticsDefaultDifficulty')).attr('class', 'progress-bar progress-bar-striped progress-bar-animated');

        if(g.default_difficulty <= 25)
            (<any> $('#gestureStatisticsDefaultDifficulty')).addClass(' bg-success');
        else if (g.default_difficulty <= 50)
            (<any> $('#gestureStatisticsDefaultDifficulty')).addClass(' bg-info');
        else if (g.default_difficulty <= 75)
            (<any> $('#gestureStatisticsDefaultDifficulty')).addClass(' bg-warning');
        else
            (<any> $('#gestureStatisticsDefaultDifficulty')).addClass(' bg-danger');



        (<any> $('#gestureStatisticsUserDifficulty')).attr('aria-valuenow', '' + g.patient_difficulty);
        (<any> document.getElementById("gestureStatisticsUserDifficulty")).style.width = g.patient_difficulty + "%";
        (<any> document.getElementById("gestureStatisticsUserDifficulty")).innerHTML = g.patient_difficulty + "%";

        (<any> $("#gestureStatisticsUserDifficulty")).removeClass();
        (<any> $("#gestureStatisticsUserDifficulty")).attr('class', 'progress-bar progress-bar-striped progress-bar-animated');

        if (g.patient_difficulty <= 25) {
            (<any> $("#gestureStatisticsUserDifficulty")).addClass(" bg-success");
        } else if (g.patient_difficulty <= 50) {
            (<any> $("#gestureStatisticsUserDifficulty")).addClass(" bg-info");
        } else if (g.patient_difficulty <= 75) {
            (<any> $("#gestureStatisticsUserDifficulty")).addClass(" bg-warning");
        } else {
            (<any> $("#gestureStatisticsUserDifficulty")).addClass(" bg-danger");
        }

    }

    loadInfo(g) {
        this.removeName = g.name;
        this.removeUsername = this.patient.username;

        const b64_image = g.image;

        (<any> document.getElementById('gestureRemovePic')).setAttribute('src', 'data:image/png;base64,' + b64_image );
        (<any> $('#id_gesture_name')).prop('readonly', true);
        (<any> $('#id_user_email')).prop('readonly', true);
    }

    removeGesture() {
        this.arcadeBattleService.removeGesture(this.removeName, this.removeUsername).subscribe(data => {
                console.log(data);
                window.location = window.location;
            }
        );
    }
}
