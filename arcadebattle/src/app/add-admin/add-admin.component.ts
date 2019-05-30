import { Component, OnInit } from '@angular/core';
import {ArcadebattleService} from '../arcadebattle.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {
  firstName = 'Daniel';
  contact = 1;
  lastName = 'Nunes';
  email = 'daniel@ua.pt';
  nif = 123;
  birthDateMonth = 1;
  birthDateDay = 2;
  birthDateYear = 1900;

  /*
  firstName: any;
  contact: any;
  lastName: any;
  email: any;
  nif: any;
  birthDateMonth: any;
  birthDateDay: any;
  birthDateYear: any;
   */

  data: any;

  constructor(private arcadeBattleService: ArcadebattleService) { }

  ngOnInit() {
  }

  addAdmin(photo: any) {
    this.data = {};
    this.data.user_type = 'admin';
    this.data.first_name = this.firstName;
    this.data.last_name = this.lastName;
    this.data.contact = this.contact;
    this.data.username = this.email;
    this.data.birth_date = this.birthDateYear + '-' + this.birthDateMonth + '-' + this.birthDateDay;
    this.data.nif = this.nif;

    const file = photo.files[0];
    const myReader = new FileReader();

    myReader.onloadend = (e) => {
      this.data.photo_b64 = myReader.result.slice(22);
    }
    myReader.readAsDataURL(file);

    this.arcadeBattleService.add_user(this.data).subscribe(data => console.log(data));

  }

}
