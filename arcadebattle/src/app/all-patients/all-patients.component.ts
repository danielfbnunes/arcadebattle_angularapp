import { Component, OnInit } from '@angular/core';
import {ArcadebattleService} from '../arcadebattle.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-all-patients',
  templateUrl: './all-patients.component.html',
  styleUrls: ['./all-patients.component.css']
})
export class AllPatientsComponent implements OnInit {

  userType: string;
  patients: object[];
  remove: any;

  constructor(private arcadeBattleService: ArcadebattleService, private location: Location) {
    this.userType = localStorage.getItem('userType');
  }

  ngOnInit() {
    (<any>$('#dtBasicExample')).DataTable();
    $('.dataTables_length').addClass('bs-select');
    if (this.userType === 'admin' || this.userType === 'doctor') {
      document.getElementById('removeButton').style.visibility = 'visible';
    } else {
      document.getElementById('removeButton').style.display = 'none';
    }
    this.getAllPatients();
  }

  getAllPatients() {
    this.arcadeBattleService.all_patients()
        .subscribe(
            data => {
              console.log(data);
              this.patients = data.data;
            }
        );
    $('#dtBasicExample tr:last').remove();

  }

  access_patient(doctor: any) {
    location.replace('patient_statistics/' + doctor.username);
  }

  loadInfo(doctor: any) {
    this.remove = {};
    this.remove.first_name = doctor.first_name;
    this.remove.last_name = doctor.last_name;
    this.remove.email = doctor.username;
  }

  removePatient(email: any) {
    this.arcadeBattleService.removeUser(email).subscribe(data => {
          console.log(data);
          window.location = window.location;
        }
    );
  }
}

