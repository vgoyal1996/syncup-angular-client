import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Client } from 'src/app/model/Client';
import { ReturnCredentials } from 'src/app/model/ReturnCredentials';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  private messageSource = new BehaviorSubject('default message');
  private clientType = new BehaviorSubject('default');
  private clientObject = new BehaviorSubject(new Client());
  private assessmentYear = new BehaviorSubject('');
  private selectedClient = new BehaviorSubject(new Client());
  private editReturnCredentialsFlag = new BehaviorSubject<boolean>(false);
  private returnCredentialsArrayForEdit = new BehaviorSubject<ReturnCredentials[]>([]);
  currentMessage = this.messageSource.asObservable();
  currentClientType = this.clientType.asObservable();
  currentClientObject = this.clientObject.asObservable();
  currentAssessmentYear = this.assessmentYear.asObservable();
  currentSelectedClient = this.selectedClient.asObservable();
  currentEditReturnCredentialsFlag = this.editReturnCredentialsFlag.asObservable();
  currentReturnCredentialsArrayForEdit = this.returnCredentialsArrayForEdit.asObservable();

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

  updateReturnCredentialsArrayForEdit(value: ReturnCredentials[]) {
    this.returnCredentialsArrayForEdit.next(value);
  }

  updateEditReturnCredentialsFlag(value: boolean) {
    this.editReturnCredentialsFlag.next(value);
  }

  updateAssessmentYear(assessmentYear: string) {
    this.assessmentYear.next(assessmentYear);
  }

  updateSelectedClient(selectedClient: Client) {
    this.selectedClient.next(selectedClient);
  }

}
