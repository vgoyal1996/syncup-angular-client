import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  private messageSource = new BehaviorSubject('default message');
  private clientType = new BehaviorSubject('default');
  currentMessage = this.messageSource.asObservable();
  currentClientType = this.clientType.asObservable();

  constructor() { }

  changeMessage(message: string) {
      this.messageSource.next(message);
    }

  updateClient(clientType: string) {
    this.clientType.next(clientType);
  }

}
