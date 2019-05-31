import { Component, OnInit } from '@angular/core';
import {ArcadebattleService} from '../arcadebattle.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  userType: string;
  profileData: any;
  birthDate: string[];
  remove: any;
  data: any;

  firstName: any;
  lastName: any;
  email: any;
  contact: any;
  nif: any;
  birthDateMonth: any;
  birthDateDay: any;
  birthDateYear: any;
  city: any;
  specialty: any;
  newPassword: any;
  repeatPassword: any;
  tmpPhotoB64: any;
  passwordMismatch = false;


  constructor(private arcadeBattleService: ArcadebattleService, private location: Location) {
    this.userType = localStorage.getItem('userType');
  }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.arcadeBattleService.my_profile()
        .subscribe(
            data => {
              this.updateData(data.data);
            }
        );
  }

  updateData(data) {
    this.profileData = data;
  }

  updateProfile(photo: any) {
    this.data = {};
    this.data.first_name = this.firstName;
    this.data.last_name = this.lastName;
    this.data.contact = this.contact;
    this.data.username = this.email;
    this.data.birth_date = this.birthDateYear + '-' + this.birthDateMonth + '-' + this.birthDateDay;
    this.data.nif = this.nif;
    this.data.city = this.city;
    this.data.specialty = this.specialty;


    // update password, if needed
    if ( this.newPassword !== undefined) {
      if (this.newPassword !== this.repeatPassword) {
        alert('Password mismatch');
        this.passwordMismatch = true;
      } else {
        this.data.new_password = this.newPassword;
        this.passwordMismatch = false;
      }
    }

    // send user type
    this.data.user_type = this.profileData.user_type;

    if (this.data.first_name === undefined) {
      this.data.first_name = this.profileData.first_name;
    }
    if (this.data.last_name === undefined) {
      this.data.last_name = this.profileData.last_name;
    }
    if (this.data.contact === undefined) {
      this.data.contact = this.profileData.contact;
    }
    if (this.data.username === undefined) {
      this.data.username = this.profileData.username;
    }
    if (this.data.birthDateYear === undefined) {
      this.data.birth_date = this.profileData.birth_date;
    }
    if (this.data.nif === undefined) {
      this.data.nif = this.profileData.nif;
    }
    if (this.data.specialty === undefined) {
      this.data.specialty = this.profileData.specialty;
    }
    if (this.data.city === undefined) {
      this.data.city = this.profileData.city;
    }
    const file = photo.files[0];
    const myReader = new FileReader();

    // update pic, if needed
    try {
      myReader.onloadend = (e) => {
        this.tmpPhotoB64 = myReader.result.slice(22);
      }
      myReader.readAsDataURL(file);
      this.data.photo_b64 = this.tmpPhotoB64;
    } catch {
    }

    if (!this.passwordMismatch) {
      console.log( this.data);
      this.arcadeBattleService.update_profile(this.data).subscribe(data => console.log(data));
      alert('profile update!');
      window.location.href = 'general_statistics';
    }


  }


}
