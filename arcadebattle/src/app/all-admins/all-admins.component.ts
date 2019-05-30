import { Component, OnInit } from '@angular/core';
import {ArcadebattleService} from '../arcadebattle.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-all-admins',
  templateUrl: './all-admins.component.html',
  styleUrls: ['./all-admins.component.css']
})
export class AllAdminsComponent implements OnInit {
  userType: string;
  admins: object[];
  remove: any;

  constructor(private arcadeBattleService: ArcadebattleService, private location: Location) {
    this.userType = localStorage.getItem('userType');
  }

  ngOnInit() {
    (<any>$('#dtBasicExample')).DataTable();
    $('.dataTables_length').addClass('bs-select');
    if (this.userType === 'admin') {
      document.getElementById('removeButton').style.visibility = 'visible';
    } else {
      document.getElementById('removeButton').style.display = 'none';
    }
    this.getAllAdmins();
  }

  getAllAdmins() {
    this.arcadeBattleService.all_admins()
        .subscribe(
            data => {
              this.admins = data.data;
            }
        );
    $('#dtBasicExample tr:last').remove();

  }

  access_patient(admin: any) {
    location.replace('admin_statistics/' + admin.username);
  }

  loadInfo(doctor: any) {
    this.remove = {};
    this.remove.first_name = doctor.first_name;
    this.remove.last_name = doctor.last_name;
    this.remove.email = doctor.username;
  }

  removeAdmin(email: any) {
    this.arcadeBattleService.removeUser(email).subscribe(data => {
          console.log(data);
          window.location = window.location;
        }
    );
  }

}
