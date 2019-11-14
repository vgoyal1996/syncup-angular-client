import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Client} from '../../model/Client';
import {Login} from '../../model/Login';
import {ReturnCredentials} from '../../model/ReturnCredentials';
import {ReturnForm} from '../../model/ReturnForm';

@Injectable({
  providedIn: 'root'
})
export class SyncupApiService {
  private BASE_URL = 'http://localhost:8080/api/v1';
  private ADD_CLIENT_URL = `${this.BASE_URL}/client/add`;
  private CHECK_LOGIN_CREDENTIALS_URL = `${this.BASE_URL}/login/validate/`;
  private CREATE_ACCOUNT_URL = `${this.BASE_URL}/login/signup`;
  private ADD_RETURN_CREDENTIALS_URL = `${this.BASE_URL}/returnCredentials/add`;
  private ADD_RETURN_FORM_URL = `${this.BASE_URL}/returnform/add`;

  constructor(private http: HttpClient) {
  }

  addClient(client: Client): Observable<any> {
    return this.http.post(this.ADD_CLIENT_URL, client);
  }

  checkLoginCredentials(userId: string): Observable<any> {
    return this.http.get(this.CHECK_LOGIN_CREDENTIALS_URL + userId);
  }

  createAccount(loginCredentials: Login): Observable<any> {
    return this.http.post(this.CREATE_ACCOUNT_URL, loginCredentials);
  }

  addReturnCredentials(returnCredentials: ReturnCredentials[]): Observable<any> {
    return this.http.post(this.ADD_RETURN_CREDENTIALS_URL, returnCredentials);
  }

  addReturnForms(returnForms: ReturnForm[]): Observable<any> {
    return this.http.post(this.ADD_RETURN_FORM_URL, returnForms);
  }
}
