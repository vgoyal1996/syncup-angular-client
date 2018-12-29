import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Client} from '../model/Client';

@Injectable({
  providedIn: 'root'
})
export class SyncupApiService {
  private BASE_URL = 'http://localhost:8080/api/v1/client';
  private ADD_CLIENT_URL = `${this.BASE_URL}/add`;

  constructor(private http: HttpClient) {
  }
  AddClient(client: Client): Observable<any> {
    return this.http.post(this.ADD_CLIENT_URL, client);
  }
}
