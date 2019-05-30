import { Component, OnInit } from '@angular/core';
import {ArcadebattleService} from '../arcadebattle.service';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {
  firstName = 'Daniel';
  contact = 1;
  lastName = 'Nunes';
  email = 'daniel@ua.pt';
  city = 'city';
  specialty = 'specialty';
  nif = 123;
  birthDateMonth = 1;
  birthDateDay = 2;
  birthDateYear = 1900;
  /*
  firstName: any;
  contact: any;
  lastName: any;
  email: any;
  city: any;
  specialty: any;
  nif: any;
  birthDateMonth: any;
  birthDateDay: any;
  birthDateYear: any;
   */

  data: any;

  constructor(private arcadeBattleService: ArcadebattleService) { }

  ngOnInit() {
  }

  addDoctor(photo: any) {
    this.data = {};
    this.data.user_type = 'doctor';
    this.data.first_name = this.firstName;
    this.data.last_name = this.lastName;
    this.data.contact = this.contact;
    this.data.username = this.email;
    this.data.birth_date = this.birthDateYear + '-' + this.birthDateMonth + '-' + this.birthDateDay;
    this.data.nif = this.nif;
    this.data.city = this.city;
    this.data.specialty = this.specialty;

    const file = photo.files[0];
    const myReader = new FileReader();

    myReader.onloadend = (e) => {
      this.data.photo_b64 = myReader.result.slice(22);
    }
    myReader.readAsDataURL(file);

    this.arcadeBattleService.add_user(this.data).subscribe(data => console.log(data));

  }

}
