import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Client } from 'src/app/model/Client';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  private messageSource = new BehaviorSubject('default message');
  private clientType = new BehaviorSubject('default');
  private clientObject = new BehaviorSubject(new Client());
  currentMessage = this.messageSource.asObservable();
  currentClientType = this.clientType.asObservable();
  currentClientObject = this.clientObject.asObservable();

  constructor() { }

  changeMessage(message: string) {
      this.messageSource.next(message);
    }

  updateClient(clientType: string) {
    this.clientType.next(clientType);
  }

  updateClientObject(client: Client) {
    this.clientObject.next(client);
  }

}
