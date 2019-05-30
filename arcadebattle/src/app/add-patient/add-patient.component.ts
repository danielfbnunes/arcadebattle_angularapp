import { Component, OnInit } from '@angular/core';
import {ArcadebattleService} from '../arcadebattle.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {
  userType = 'doctor';
  firstName = 'Daniel';
  contact = 1;
  lastName = 'Nunes';
  email = 'daniel@ua.pt';
  nif = 123;
  birthDateMonth = 1;
  birthDateDay = 2;
  birthDateYear = 1900;
  doctor = 'doctor1@ua.pt';
  /*
  userType: string;
  firstName: any;
  contact: any;
  lastName: any;
  email: any;
  nif: any;
  birthDateMonth: any;
  birthDateDay: any;
  birthDateYear: any;
  doctor: any;
   */

  data: any;

  constructor(private arcadeBattleService: ArcadebattleService) {
    this.userType = localStorage.getItem('userType');
  }

  ngOnInit() {
  }

  addPatient(photo: any) {
    this.data = {};
    this.data.user_type = 'patient';
    this.data.first_name = this.firstName;
    this.data.last_name = this.lastName;
    this.data.contact = this.contact;
    this.data.username = this.email;
    this.data.birth_date = this.birthDateYear + '-' + this.birthDateMonth + '-' + this.birthDateDay;
    this.data.nif = this.nif;
    this.data.doctor = this.doctor;

    const file = photo.files[0];
    const myReader = new FileReader();

    myReader.onloadend = (e) => {
      this.data.photo_b64 = myReader.result.slice(22);
    }
    myReader.readAsDataURL(file);

    this.arcadeBattleService.add_user(this.data).subscribe(data => console.log(data));
  }

}
