import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {
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
  photo: any;

  constructor() { }

  ngOnInit() {
  }

  addDoctor(){

  }

}
