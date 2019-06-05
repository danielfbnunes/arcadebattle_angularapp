import { Component, OnInit } from '@angular/core';
import {ArcadebattleService} from '../arcadebattle.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-general-statistics',
  templateUrl: './general-statistics.component.html',
  styleUrls: ['./general-statistics.component.css']
})
export class GeneralStatisticsComponent implements OnInit {

  groupsCount = new Map();
  games = new Map();

  constructor(private arcadeBattleService: ArcadebattleService){
  }

  testFunc(testStr: string, gamesStr: string){
    let userStats;
    let topPlayedGames;

    const canva = (<HTMLCanvasElement> document.getElementById('topPlayedGames'));
    const ctx = canva.getContext('2d');
    if(canva) {
      canva.height = 150;
      topPlayedGames = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [],
          datasets: [
            {
              label: 'Games',
              data: [],
              borderColor: 'rgba(66, 66, 244, 0.9)',
              borderWidth: '0',
              backgroundColor: 'rgba(66, 66, 244, 0.5)'
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

    const canva2 = (<HTMLCanvasElement> document.getElementById('userStats'));
    const ctx2 = canva2.getContext('2d');

    if(canva2) {
      canva2.height = 150;
      userStats = new Chart(ctx2, {
        type: 'bar',
        data: {
          labels: [],
          datasets: [
            {
              label: 'Users',
              data: [],
              borderColor: 'rgba(255, 187, 0, 0.9)',
              borderWidth: '0',
              backgroundColor: 'rgba(255, 187, 0, 0.5)'
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
    function replaceAll(text, search, replacement) {
      return text.split(search).join(replacement);
    }

    function getStats() {
      let temp: any;
      temp = testStr;
      temp = replaceAll(temp, '\'', '\"');
      let jsonData = JSON.parse(temp);

      userStats.data.labels = [];
      userStats.data.datasets[0].data = [];

      Object.keys(jsonData).forEach(function(group) {
        userStats.data.labels.push(group)
        userStats.data.datasets[0].data.push(jsonData[group])
      });

      userStats.update();

      temp = gamesStr;
      jsonData = JSON.parse(temp);

      topPlayedGames.data.labels = [];
      topPlayedGames.data.datasets[0].data = [];

      Object.keys(jsonData).forEach(function(group) {
        topPlayedGames.data.labels.push(group)
        topPlayedGames.data.datasets[0].data.push(jsonData[group])
      });

      topPlayedGames.update();
    }
  }

  ngOnInit() {
    this.groupsCount.set('Doctors', 0);
    this.groupsCount.set('Patients', 0);
    this.groupsCount.set('Admins', 0);
    this.getAllGamesPlayed();
  }

  getAllGamesPlayed(): void {
    this.arcadeBattleService.games_played()
        .subscribe(
            json => {
              this.getAllPeople(JSON.stringify(json.data));
            }
        );
  }

  getAllPeople(g: string): void {
    this.arcadeBattleService.all_people()
      .subscribe(
        json => {
          for (let i = 0; i < (json.data as object[]).length; i++) {
            const type = (<Map<string, string>>(json.data as object[])[i])['user_type'];
            if (type === 'doctor') this.groupsCount.set('Doctors', this.groupsCount.get('Doctors') + 1);
            if (type === 'admin') this.groupsCount.set('Admins', this.groupsCount.get('Admins') + 1);
            if (type === 'patient') this.groupsCount.set('Patients', this.groupsCount.get('Patients') + 1);
          }
          let str = '{';

          this.groupsCount.forEach((value: number, key: string) => {
            str += '\''+ key + '\': ' + value + ', ';
          });
          str = str.slice(0, -2) + '}';
          this.testFunc(str, g);
        });
  }
}
