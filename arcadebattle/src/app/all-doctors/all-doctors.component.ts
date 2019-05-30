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
  remove: any;

  constructor(private arcadeBattleService: ArcadebattleService, private location: Location) {
    this.userType = localStorage.getItem('userType');
  }

  ngOnInit() {
    (<any>$('#dtBasicExample')).DataTable();
    $('.dataTables_length').addClass('bs-select');
    if (this.userType === 'admin') {
      document.getElementById('removeButton').style.visibility = 'visible';
    }
    this.getAllDoctors();
  }

  getAllDoctors() {
    this.arcadeBattleService.all_doctors()
        .subscribe(
            data => {
              this.doctors = data.data;
            }
        );
    $('#dtBasicExample tr:last').remove();

  }

  access_patient(doctor: any) {
    location.replace('doctor_statistics/' + doctor.username);
  }

  loadInfo(doctor: any) {
    this.remove = {};
    this.remove.first_name = doctor.first_name;
    this.remove.last_name = doctor.last_name;
    this.remove.email = doctor.username;
  }

  removeDoctor(email: any) {
    this.arcadeBattleService.removeUser(email).subscribe(data => {
      console.log(data);
      window.location = window.location;
    }
  );
  }
}
