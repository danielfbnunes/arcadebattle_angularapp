import { Component, OnInit } from '@angular/core';
import {ArcadebattleService} from '../arcadebattle.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-all-doctors',
  templateUrl: './all-doctors.component.html',
  styleUrls: ['./all-doctors.component.css']
})

export class AllDoctorsComponent implements OnInit {
  userType: string;
  doctors: object[];

  constructor(private arcadeBattleService: ArcadebattleService, private location: Location) {
    this.userType = localStorage.getItem('userType');
  }

  ngOnInit() {
    (<any>$('#dtBasicExample')).DataTable();
    $('.dataTables_length').addClass('bs-select');
    this.getAllDoctors();
  }

  getAllDoctors() {
    this.arcadeBattleService.all_doctors()
        .subscribe(
            data => {
              this.doctors = data.data;
            }
        );
  }

  access_patient(doctor: any) {
    location.replace('doctor_statistics/' + doctor.username);
  }

  loadInfo(doctor: any) {
    console.log('loadInfo');
  }

}
