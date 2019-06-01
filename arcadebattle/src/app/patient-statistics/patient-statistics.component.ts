import { Component, OnInit } from '@angular/core';
import {ArcadebattleService} from '../arcadebattle.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-patient-statistics',
  templateUrl: './patient-statistics.component.html',
  styleUrls: ['./patient-statistics.component.css']
})
export class PatientStatisticsComponent implements OnInit {

    gestures: any;
    notes: any;
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

  testFunc(patientGestures: any, gamesQuant: any) {
      let gesturesChart;
      let topGamesChart;

      const canva = (<HTMLCanvasElement> document.getElementById('topGamesChart'));
      const ctx = canva.getContext('2d');
      if (canva) {
          canva.height = 150;
          topGamesChart = new Chart(ctx, {
              type: 'bar',
              data: {
                  labels: [],
                  datasets: [
                      {
                          label: 'Games',
                          data: [],
                          borderColor: 'rgba(93, 213, 93, 0.9)',
                          borderWidth: '0',
                          backgroundColor: 'rgba(93, 213, 93, 0.5)'
                      }
                  ]
              },
              options: {
                  legend: {
                      position: 'top',
                      labels: {
                          fontFamily: 'Poppins'
                      }

                  },
                  scales: {
                      xAxes: [{
                          ticks: {
                              fontFamily: 'Poppins'

                          }
                      }],
                      yAxes: [{
                          ticks: {
                              beginAtZero: true,
                              fontFamily: 'Poppins'
                          }
                      }]
                  }
              }
          });
      }

      const canva2 = (<HTMLCanvasElement> document.getElementById('gesturesChart'));
      const ctx2 = canva2.getContext('2d');

      if (canva2) {
          canva2.height = 150;
          gesturesChart = new Chart(ctx2, {
              type: 'bar',
              defaultFontFamily: 'Poppins',
              data: {
                  labels: [],
                  datasets: [
                      {
                          label: 'Default Difficulty',
                          data: [],
                          borderColor: 'rgba(0, 123, 255, 0.9)',
                          borderWidth: '0',
                          backgroundColor: 'rgba(0, 123, 255, 0.5)',
                          fontFamily: 'Poppins'
                      },
                      {
                          label: 'User Difficulty',
                          data: [],
                          borderColor: 'rgba(0,0,0,0.09)',
                          borderWidth: '0',
                          backgroundColor: 'rgba(0,0,0,0.07)',
                          fontFamily: 'Poppins'
                      }
                  ]
              },
              options: {
                  legend: {
                      position: 'top',
                      labels: {
                          fontFamily: 'Poppins'
                      }

                  },
                  scales: {
                      xAxes: [{
                          ticks: {
                              fontFamily: 'Poppins'

                          }
                      }],
                      yAxes: [{
                          ticks: {
                              beginAtZero: true,
                              fontFamily: 'Poppins'
                          }
                      }]
                  }
              }
          });
      }

      getStats();

      (<any> Function.prototype).toJSON = function() {
          const parts = this
              .toString()
              .match(/^\s*function[^(]*\(([^)]*)\)\s*{(.*)}\s*$/)
          ;
          if (parts == null) {
              throw 'Function form not supported';
          }
          return [
              'window.Function',
              parts[1].trim().split(/\s*,\s*/),
              parts[2]
          ];
      }

      function replaceAll(text, search, replacement) {
          return text.split(search).join(replacement);
      }

      function getStats() {

          topGamesChart.data.labels = [];
          topGamesChart.data.datasets[0].data = [];


          topGamesChart.data.labels = gamesQuant[0];  // ["Flappy Bird", "Gun Fight", "Quiz", "Space Invaders"];
          topGamesChart.data.datasets[0].data = gamesQuant[1]; // [22,16,30,9];
          topGamesChart.update();

          /* gestures_dict = {}
            for g in patient_gestures:
                gestures_dict[str(g["id"])] = [g["name"], g["patient_difficulty"], g["default_difficulty"]]
           */
          const gesturesDict = new Map();
          for (let i = 0; i < patientGestures.length; i++) {
              const obj = (<any> patientGestures[i]);
              (<any> gesturesDict).set(obj.id, [obj.name, obj.patient_difficulty, obj.default_difficulty]);
          }

          let str = '{ ';

          gesturesDict.forEach((value: Array<any>, key: number) => {
              str += '\'' + key + '\' : [ \'' + value[0] + '\', ' + value[1] + ', ' + value[2] + ' ], ';
          });
          str = str.slice(0, -2) + '}';
          const temp = replaceAll(str, '\'', '\"');
          const gestureJSON = JSON.parse(temp)

          Object.keys(gestureJSON).forEach(function(id) {
              gesturesChart.data.labels.push(gestureJSON[id][0]);
              gesturesChart.data.datasets[0].data.push(gestureJSON[id][2]);
              gesturesChart.data.datasets[1].data.push(gestureJSON[id][1]);
          });

          gesturesChart.update();
      }
  }

  getGamesPlayed(patientGest: any, username: string): void {
      this.arcadeBattleService.games_played_by_user(username)
          .subscribe(data => {
                const gamesArray = [[], []];
                Object.keys(data.data).forEach(function(gameName) {
                    gamesArray[0].push(gameName);
                });
                Object.values(data.data).forEach(function(gamesPlayed) {
                    gamesArray[1].push((<any> gamesPlayed).length);
                });
                this.testFunc(patientGest, gamesArray);
              }
          );
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
              this.notes = this.patient.notes;
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
              this.patientGestures = data.data;
              this.getGamesPlayed(data.data, username);
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

    updateNotes() {
        let dic: any;
        dic = {};
        dic.username = this.patient.username;
        dic.notes = this.notes;
        this.arcadeBattleService.update_notes(dic).subscribe(data => {
                console.log(data);
                window.location = window.location;
            }
        );
    }
}
