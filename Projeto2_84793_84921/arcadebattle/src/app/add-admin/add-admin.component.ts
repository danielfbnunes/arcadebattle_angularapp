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

  // for picture uploading
  reader: any;
  imageSrc = '';
  state = '';
  stateMessage = '';

  constructor(private arcadeBattleService: ArcadebattleService) { }

  ngOnInit() {
    this.state = '';
    this.stateMessage = '';
  }

  handleInputChange(e) {
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    const pattern = /image-*/;
    this.reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    this.reader.onload = this._handleReaderLoaded.bind(this);
    this.reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    this.reader = e.target;
    this.imageSrc = this.reader.result;
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
    this.data.photo_b64 = this.imageSrc.split(',')[1];


    this.arcadeBattleService.add_user(this.data).subscribe(data => {
      console.log(data);
      this.state = data.state;
      this.stateMessage = data.state_message;
    });

  }

}
