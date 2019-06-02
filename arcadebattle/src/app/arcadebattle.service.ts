import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class ArcadebattleService {
  private baseUrl = 'http://ec2-54-90-131-220.compute-1.amazonaws.com:80/';
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const url = this.baseUrl + 'login';
    return this.http.post(url, {'username': username, 'password': password}, httpOptions);
  }

  all_people(): Observable<any> {
    const url = this.baseUrl + 'all_people';
    httpOptions.headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization' : 'Token ' + localStorage.getItem('token')});
    return this.http.get<any>(url, httpOptions);
  }

  games_played(): Observable<any> {
    const url = this.baseUrl + 'games_played';
    httpOptions.headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization' : 'Token ' + localStorage.getItem('token')});
    return this.http.get<any>(url, httpOptions);
  }

  all_doctors(): Observable<any> {
    const url = this.baseUrl + 'all_doctors';
    httpOptions.headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization' : 'Token ' + localStorage.getItem('token')});
    return this.http.get<any>(url, httpOptions);
  }

  get_profile(username: string): Observable<any> {
    const url = this.baseUrl + 'profile/' + username;
    httpOptions.headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization' : 'Token ' + localStorage.getItem('token')});
    return this.http.get<any>(url, httpOptions);
  }

  all_games(): Observable<any> {
    const url = this.baseUrl + 'all_games';
    httpOptions.headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization' : 'Token ' + localStorage.getItem('token')});
    return this.http.get<any>(url, httpOptions);
  }

  removeUser(username: string): Observable<any> {
    const url = this.baseUrl + 'delete_user/' + username;
    httpOptions.headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization' : 'Token ' + localStorage.getItem('token')});
    return this.http.delete<any>(url, httpOptions);
  }

  add_user(data: any): Observable<any> {
    const url = this.baseUrl + 'new_user';
    httpOptions.headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization' : 'Token ' + localStorage.getItem('token')});
    return this.http.post(url, data, httpOptions);
  }

  all_admins(): Observable<any> {
    const url = this.baseUrl + 'all_admins';
    httpOptions.headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization' : 'Token ' + localStorage.getItem('token')});
    return this.http.get<any>(url, httpOptions);
  }

  all_patients(): Observable<any> {
    const url = this.baseUrl + 'all_patients';
    httpOptions.headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization' : 'Token ' + localStorage.getItem('token')});
    return this.http.get<any>(url, httpOptions);
  }

  add_game(data: any): Observable<any> {
    const url = this.baseUrl + 'new_game';
    httpOptions.headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization' : 'Token ' + localStorage.getItem('token')});
    return this.http.post(url, data, httpOptions);
  }

  get_gestures(username: any): Observable<any> {
    const url = this.baseUrl + 'gestures/' + username;
    httpOptions.headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization' : 'Token ' + localStorage.getItem('token')});
    return this.http.get<any>(url, httpOptions);
  }

  removeGesture(name: string, username: string): Observable<any> {
    const url = this.baseUrl + 'delete_gesture/' + username + '/' + name;
    httpOptions.headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization' : 'Token ' + localStorage.getItem('token')});
    return this.http.delete<any>(url, httpOptions);
  }

    my_profile(): Observable<any> {
        const url = this.baseUrl + 'my_profile';
        httpOptions.headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization' : 'Token ' + localStorage.getItem('token')});
        return this.http.get<any>(url, httpOptions);
    }

    update_profile(data: any): Observable<any> {
        const url = this.baseUrl + 'update_profile';
        httpOptions.headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization' : 'Token ' + localStorage.getItem('token')});
        return this.http.post(url, data, httpOptions);
    }

    games_played_by_user(email: any): Observable<any> {
        const url = this.baseUrl + 'games_played_by_user/' + email;
        httpOptions.headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization' : 'Token ' + localStorage.getItem('token')});
        return this.http.get<any>(url, httpOptions);
    }

    update_notes(data: any): Observable<any> {
      const url = this.baseUrl + 'update_notes';
      httpOptions.headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization' : 'Token ' + localStorage.getItem('token')});
      return this.http.post(url, data, httpOptions);
    }

    add_gesture(data: any): Observable<any> {
      const url = this.baseUrl + 'add_gesture';
      httpOptions.headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization' : 'Token ' + localStorage.getItem('token')});
      return this.http.post(url, data, httpOptions);
    }
}
