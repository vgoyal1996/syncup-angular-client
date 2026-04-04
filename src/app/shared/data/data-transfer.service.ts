import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from 'src/app/model/Client';
import { ReturnCredentials } from 'src/app/model/ReturnCredentials';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  private messageSource = new BehaviorSubject('default message');
  private clientType = new BehaviorSubject('default');
  private clientObject = new BehaviorSubject(new Client());
  private assessmentYear: BehaviorSubject<string>;
  private selectedClient: BehaviorSubject<Client>;
  private editReturnCredentialsFlag = new BehaviorSubject<boolean>(false);
  private returnCredentialsArrayForEdit = new BehaviorSubject<ReturnCredentials[]>([]);
  currentMessage = this.messageSource.asObservable();
  currentClientType = this.clientType.asObservable();
  currentClientObject = this.clientObject.asObservable();
  currentAssessmentYear: Observable<string>;
  currentSelectedClient: Observable<Client>;
  currentEditReturnCredentialsFlag = this.editReturnCredentialsFlag.asObservable();
  currentReturnCredentialsArrayForEdit = this.returnCredentialsArrayForEdit.asObservable();

  constructor() {
    // Restore assessmentYear from localStorage
    const storedAY = localStorage.getItem('syncup_assessmentYear') || '';
    this.assessmentYear = new BehaviorSubject<string>(storedAY);
    this.currentAssessmentYear = this.assessmentYear.asObservable();

    // Restore selectedClient from localStorage
    const storedClient = localStorage.getItem('syncup_selectedClient');
    let restoredClient = new Client();
    if (storedClient) {
      try {
        const parsed = JSON.parse(storedClient);
        restoredClient = new Client();
        restoredClient.mapResponseToClientObject(parsed);
      } catch (e) {
        console.warn('Failed to restore client from localStorage', e);
      }
    }
    this.selectedClient = new BehaviorSubject<Client>(restoredClient);
    this.currentSelectedClient = this.selectedClient.asObservable();
  }

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
    localStorage.setItem('syncup_assessmentYear', assessmentYear);
  }

  updateSelectedClient(selectedClient: Client) {
    this.selectedClient.next(selectedClient);
    // Persist to localStorage for page refresh resilience
    try {
      // Check if it's a raw object or Client instance
      const isInstance = typeof selectedClient.getId === 'number';
      const serializable = {
        id: isInstance ? selectedClient.getId : selectedClient['id'],
        name: isInstance ? selectedClient.getName : selectedClient['name'],
        clientCode: isInstance ? selectedClient.getClientCode : selectedClient['clientCode'],
        fatherName: isInstance ? selectedClient.getFatherName : selectedClient['fatherName'],
        flatNo: isInstance ? selectedClient.getFlatNo : selectedClient['flatNo'],
        area: isInstance ? selectedClient.getArea : selectedClient['area'],
        city: isInstance ? selectedClient.getCity : selectedClient['city'],
        state: isInstance ? selectedClient.getState : selectedClient['state'],
        pin: isInstance ? selectedClient.getPin : selectedClient['pin'],
        clientType: isInstance ? selectedClient.getClientType : selectedClient['clientType'],
        mobile: isInstance ? selectedClient.getMobile : selectedClient['mobile'],
        clientEmail: isInstance ? selectedClient.getClientEmail : selectedClient['clientEmail'],
        pan: isInstance ? selectedClient.getPan : selectedClient['pan'],
        doiOrDob: isInstance ? selectedClient.getDoiOrDob : selectedClient['doiOrDob'],
        responsiblePersonName: isInstance ? selectedClient.getResponsiblePersonName : selectedClient['responsiblePersonName'],
        responsiblePersonPAN: isInstance ? selectedClient.getResponsiblePersonPAN : selectedClient['responsiblePersonPAN'],
        responsiblePersonDOB: isInstance ? selectedClient.getResponsiblePersonDOB : selectedClient['responsiblePersonDOB'],
        responsiblePersonAadhaar: isInstance ? selectedClient.getResponsiblePersonAadhaar : selectedClient['responsiblePersonAadhaar'],
        cin: isInstance ? selectedClient.getCin : selectedClient['cin']
      };
      localStorage.setItem('syncup_selectedClient', JSON.stringify(serializable));
    } catch (e) {
      console.warn('Failed to save client to localStorage', e);
    }
  }

}

