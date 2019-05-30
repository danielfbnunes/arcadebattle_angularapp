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
    console.log(data);
    return this.http.post(url, data, httpOptions);
  }
}
