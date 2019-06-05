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
  city: any;
  specialty: any;
  newPassword: any;
  repeatPassword: any;
  tmpPhotoB64: any;
  passwordMismatch = false;
  tmpProfile: any;

  // for picture uploading
  reader: any;
  imageSrc = '';


  constructor(private arcadeBattleService: ArcadebattleService, private location: Location) {
    this.userType = localStorage.getItem('userType');
  }

  ngOnInit() {
    this.getProfile();
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
    this.profileData.pic = 'data:image/png;base64,' + this.profileData.photo_b64.trim();
  }

  updateProfile() {
    this.data = {};
    this.data.first_name = this.firstName;
    this.data.last_name = this.lastName;
    this.data.contact = this.contact;
    this.data.username = this.email;
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
    this.data.birth_date = this.profileData.birth_date;

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
    if (this.data.nif === undefined) {
      this.data.nif = this.profileData.nif;
    }
    if (this.data.specialty === undefined) {
      this.data.specialty = this.profileData.specialty;
    }
    if (this.data.city === undefined) {
      this.data.city = this.profileData.city;
    }

    // update pic, if needed
    if (this.imageSrc !== '') {
      this.data.photo_b64 = this.imageSrc.split(',')[1];
    }

    if (!this.passwordMismatch) {
      console.log( this.data);
      this.arcadeBattleService.update_profile(this.data).subscribe(data => console.log(data));
      alert('profile update!');
      window.location.href = 'general_statistics';
    }

    // update user profile on app_component
    this.tmpProfile = {};
    this.tmpProfile.firstName = this.data.first_name;
    this.tmpProfile.userType = this.data.user_type;
    this.tmpProfile.lastName = this.data.last_name;
    if ( this.data.photo_b64 !== undefined) {
      this.tmpProfile.photoB64 = this.data.photo_b64;
    } else {
      this.tmpProfile.photoB64 = this.profileData.photo_b64;
    }
    localStorage.setItem('current_user', JSON.stringify(this.tmpProfile));


  }


}
