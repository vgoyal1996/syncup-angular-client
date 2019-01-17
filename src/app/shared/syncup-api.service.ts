import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Client} from '../model/Client';
import {Login} from '../model/Login';

@Injectable({
  providedIn: 'root'
})
export class SyncupApiService {
  private BASE_URL = 'http://localhost:8080/api/v1';
  private ADD_CLIENT_URL = `${this.BASE_URL}/client/add`;
  private CHECK_LOGIN_CREDENTIALS_URL = `${this.BASE_URL}/login/validate/`;
  private CREATE_ACCOUNT_URL = `${this.BASE_URL}/login/signup`;

  constructor(private http: HttpClient) {
  }

  AddClient(client: Client): Observable<any> {
    return this.http.post(this.ADD_CLIENT_URL, client);
  }

  checkLoginCredentials(userId: string): Observable<any> {
    return this.http.get(this.CHECK_LOGIN_CREDENTIALS_URL + userId);
  }

  createAccount(loginCredentials: Login): Observable<any> {
    return this.http.post(this.CREATE_ACCOUNT_URL, loginCredentials);
  }

}
