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
  private baseUrl = 'http://127.0.0.1:9000/';
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
}
