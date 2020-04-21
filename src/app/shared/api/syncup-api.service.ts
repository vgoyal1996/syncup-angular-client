import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../../model/Client';
import { Login } from '../../model/Login';
import { ReturnCredentials } from '../../model/ReturnCredentials';
import { ReturnForm } from '../../model/ReturnForm';
import { map } from 'rxjs/operators';

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
  private GET_RETURN_FORMS_BY_RETURN_TYPE = `${this.BASE_URL}/returnform/get/`;
  private UPDATE_RETURN_FORM_BY_RETURN_TYPE_AND_RETURN_NAME = `${this.BASE_URL}/returnform/`;
  private DELETE_RETURN_FORMS_BY_FORM_NAMES = `${this.BASE_URL}/returnform/`;
  private GET_ALL_RETURN_FORMS = `${this.BASE_URL}/returnform/all`;
  private GET_ALL_CLIENTS = `${this.BASE_URL}/client`;
  private UPDATE_CLIENT = `${this.BASE_URL}/client/`

  constructor(private http: HttpClient) {
  }

  addClient(client: Client): Observable<number> {
    return this.http.post(this.ADD_CLIENT_URL, client).pipe(map(id => Number(id)));
  }

  checkLoginCredentials(userId: string): Observable<any> {
    return this.http.get(this.CHECK_LOGIN_CREDENTIALS_URL + userId);
  }

  createAccount(loginCredentials: Login): Observable<any> {
    return this.http.post(this.CREATE_ACCOUNT_URL, loginCredentials);
  }

  addReturnCredentials(returnCredentials: ReturnCredentials): Observable<any> {
    return this.http.post(this.ADD_RETURN_CREDENTIALS_URL, returnCredentials);
  }

  addReturnForm(returnForm: ReturnForm): Observable<any> {
    return this.http.post(this.ADD_RETURN_FORM_URL, returnForm);
  }

  getReturnFormsByReturnType(returnType: string): Observable<ReturnForm[]> {
    return <Observable<ReturnForm[]>>this.http.get(this.GET_RETURN_FORMS_BY_RETURN_TYPE + returnType);
  }

  updateReturnFormByReturnTypeAndReturnName(returnType: string, returnName: string, newReturnForm: ReturnForm): Observable<any> {
    return this.http.put(this.UPDATE_RETURN_FORM_BY_RETURN_TYPE_AND_RETURN_NAME + returnType + `/` + returnName, newReturnForm);
  }

  updateClientByClientCode(clientCode: string, newClient: Client): Observable<boolean> {
    return this.http.put(this.UPDATE_CLIENT + clientCode, newClient).pipe(map(data => Boolean(data)));
  }

  deleteReturnFormsByFormNames(returnType: string, formNameList: string[]): Observable<any> {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(formNameList)
    };
    return this.http.delete(this.DELETE_RETURN_FORMS_BY_FORM_NAMES + returnType, options);
  }

  deleteClientsByClientCodes(clientCodeList: string[]): Observable<number> {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(clientCodeList)
    };
    return this.http.delete(this.GET_ALL_CLIENTS, options).pipe(map(res => Number(res)));
  }

  getAllReturnForms(): Observable<ReturnForm[]> {
    return <Observable<ReturnForm[]>>this.http.get(this.GET_ALL_RETURN_FORMS);
  }

  getAllClients(): Observable<Client[]> {
    return this.http.get(this.GET_ALL_CLIENTS).pipe(
      map(response => {
        const res: any =  response || [];
        return res.map((item) => {
          let client = new Client();
          client.mapResponseToClientObject(item);
          return client;
        })
      })
    );
  }
}
