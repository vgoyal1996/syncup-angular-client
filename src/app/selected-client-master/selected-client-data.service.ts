import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, ReplaySubject } from 'rxjs';
import { ReturnCredentials } from '../model/ReturnCredentials';

@Injectable({
  providedIn: 'root'
})
export class SelectedClientDataService {
  private returnCredsArray = new ReplaySubject<ReturnCredentials[]>(1);
  currentReturnCredsArray = this.returnCredsArray.asObservable();

  constructor() { }

  public updateReturnCredsArray(credsArray: ReturnCredentials[]) {
    this.returnCredsArray.next(credsArray);
  }
}
