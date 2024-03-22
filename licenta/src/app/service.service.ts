import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private httpURL = 'http://localhost:8081';
  public userLogged!: User;
  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<User[]>(this.httpURL + '/getUsers')
  }

  postUser(user: User): Observable<User> {
    return this.http.post<User>(this.httpURL + '/postUsers', user);
  }

}
