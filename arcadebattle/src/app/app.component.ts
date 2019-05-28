import {Component, OnInit} from '@angular/core';
import {ArcadebattleService} from './arcadebattle.service';
import {Router} from '@angular/router';

export class User {
  userType: string;
  firstName: string;
  lastName: string;
  email: string;
  photoB64: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  ngOnInit(): void {
    localStorage.removeItem('token');
  }

  // DEPOIS APAGAR INICIALIZAÇÃO
  username = 'doctor1@ua.pt';
  password = 'doctor1';
  // DEPOIS APAGAR INICIALIZAÇÃO

  userData = new User();
  authenticated = false;

  constructor(private arcadeBattleService: ArcadebattleService, private router: Router){
  }

  noToken(): boolean {
    console.log((localStorage.getItem('token') == null));
    return (localStorage.getItem('token') == null);
  }

  loginFunc(): void {
    this.arcadeBattleService.login(this.username, this.password)
      .subscribe(
        data => {
                  if (data) {
                    localStorage.setItem('token', data.token);
                    this.userData.userType = data.user_type;
                    this.userData.firstName = data.first_name;
                    this.userData.lastName = data.last_name;
                    this.userData.email = data.email;
                    this.userData.photoB64 = data.photo_b64;
                    localStorage.setItem('current_user', JSON.stringify(this.userData))
                    this.authenticated = true;
                  }
        });
  }
}
