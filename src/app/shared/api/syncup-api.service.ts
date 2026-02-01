import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../../model/Client';
import { Login } from '../../model/Login';
import { ReturnCredentials } from '../../model/ReturnCredentials';
import { ReturnForm } from '../../model/ReturnForm';
import { map } from 'rxjs/operators';
import { tag } from 'rxjs-spy/operators';
import { DueDateScheduler } from 'src/app/model/DueDateScheduler';
import { ClientReturnForms } from 'src/app/model/ClientReturnForms';

@Injectable({
  providedIn: 'root'
})
export class SyncupApiService {
  private BASE_URL = 'http://localhost:8080/api/v1';
  // private BASE_URL = 'https://master.d22ely06w0gi33.amplifyapp.com/api/v1';
  private ADD_CLIENT_URL = `${this.BASE_URL}/client/add`;
  private CHECK_LOGIN_CREDENTIALS_URL = `${this.BASE_URL}/login/validate/`;
  private CREATE_ACCOUNT_URL = `${this.BASE_URL}/login/signup`;
  private ADD_RETURN_CREDENTIALS_URL = `${this.BASE_URL}/return-credentials/`;
  private ADD_RETURN_FORM_URL = `${this.BASE_URL}/returnform/add`;
  private GET_RETURN_FORMS_BY_RETURN_TYPE = `${this.BASE_URL}/returnform/get/`;
  private UPDATE_RETURN_FORM_BY_RETURN_TYPE_AND_RETURN_NAME = `${this.BASE_URL}/returnform/`;
  private DELETE_RETURN_FORMS_BY_FORM_NAMES = `${this.BASE_URL}/returnform/`;
  private GET_ALL_RETURN_FORMS = `${this.BASE_URL}/returnform/all`;
  private GET_ALL_CLIENTS = `${this.BASE_URL}/client`;
  private UPDATE_CLIENT = `${this.BASE_URL}/client/`;
  private GET_RETURN_CREDENTIALS_BY_CLIENT_ID = `${this.BASE_URL}/return-credentials/`;
  private UPDATE_RETURN_CREDENTIALS_BY_RETURN_ID = `${this.BASE_URL}/return-credentials/`;
  private UPDATE_CLIENT_RETURN_FORM = `${this.BASE_URL}/return-credentials/client-return-form/`;
  private ADD_REVISED_DUE_DATE_OF_FILING = `${this.BASE_URL}/returnform/revised-due-date/`;
  private GET_CLIENT_BY_CLIENT_ID = `${this.BASE_URL}/client/`;

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

  addReturnCredentials(clientId: string, returnCredentials: ReturnCredentials): Observable<any> {
    return this.http.post(this.ADD_RETURN_CREDENTIALS_URL + clientId, returnCredentials);
  }

  addReturnForm(returnForm: ReturnForm): Observable<ReturnForm> {
    return this.http.post(this.ADD_RETURN_FORM_URL, returnForm).pipe(
      map(response => {
        let returnForm = new ReturnForm();
        returnForm.mapResponseToReturnForm(response);
        return returnForm;
      })
    );
  }

  getReturnFormsByReturnType(returnType: string): Observable<ReturnForm[]> {
    return this.http.get(this.GET_RETURN_FORMS_BY_RETURN_TYPE + returnType).pipe(
      map(response => {
        const res: any = response || [];
        return res.map((item) => {
          let returnForm = new ReturnForm();
          returnForm.mapResponseToReturnForm(item);
          return returnForm;
        })
      })
    );
  }

  updateReturnFormByReturnTypeAndReturnName(returnType: string, returnName: string, newReturnForm: ReturnForm): Observable<ReturnForm> {
    return this.http.put(this.UPDATE_RETURN_FORM_BY_RETURN_TYPE_AND_RETURN_NAME + returnType + `/` + returnName, newReturnForm).pipe(
      map(response => {
        let returnForm = new ReturnForm();
        returnForm.mapResponseToReturnForm(response);
        return returnForm;
      })
    );
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
    return this.http.get(this.GET_ALL_RETURN_FORMS).pipe(
      map(response => {
        const res: any = response || [];
        return res.map((item) => {
          let returnForm = new ReturnForm();
          returnForm.mapResponseToReturnForm(item);
          return returnForm;
        })
      })
    );
  }

  getAllClients(): Observable<Client[]> {
    return this.http.get(this.GET_ALL_CLIENTS).pipe(
      map(response => {
        const res: any = response || [];
        return res.map((item) => {
          let client = new Client();
          client.mapResponseToClientObject(item);
          return client;
        })
      })
    );
  }

  getClientByClientId(clientId: number): Observable<Client> {
    return this.http.get(this.GET_CLIENT_BY_CLIENT_ID + clientId).pipe(
      map(response => {
        let client = new Client();
        client.mapResponseToClientObject(response);
        return client;
      })
    )
  }

  getReturnCredentialsByClientId(assessmentYear: string, clientId: number): Observable<ReturnCredentials[]> {
    return this.http.get(this.GET_RETURN_CREDENTIALS_BY_CLIENT_ID + assessmentYear + "/" + clientId).pipe(
      tag("getProductById"),
      map(response => {
        const res: any = response || [];
        return res.map((item) => {
          let returnCredentials = new ReturnCredentials();
          returnCredentials.mapResponseToReturnCredentials(item);
          return returnCredentials;
        })
      })
    );
  }

  updateReturnCredentialsByReturnId(assessmentYear: string, returnId: number, newCreds: ReturnCredentials): Observable<boolean> {
    return this.http.put(this.UPDATE_RETURN_CREDENTIALS_BY_RETURN_ID + assessmentYear + '/' + returnId, newCreds)
      .pipe(map(data => Boolean(data)));
  }

  updateClientReturnForm(assessmentYear: string, returnId: number, data: any): Observable<boolean> {
    return this.http.put(this.UPDATE_CLIENT_RETURN_FORM + assessmentYear + "/" + returnId, data)
      .pipe(map(res => Boolean(res)));
  }

  addRevisedDueDateOfFiling(formName: string, dueDateScheduler: DueDateScheduler): Observable<ReturnForm> {
    return this.http.put(this.ADD_REVISED_DUE_DATE_OF_FILING + formName, dueDateScheduler)
      .pipe(
        map(res => {
          let returnForm = new ReturnForm();
          returnForm.mapResponseToReturnForm(res);
          return returnForm;
        })
      );
  }
}
