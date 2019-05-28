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
}
