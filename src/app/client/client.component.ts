import { Component, OnInit } from '@angular/core';
import {Client} from '../model/Client';
import {SyncupApiService} from '../shared/syncup-api.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  clientModel: Client = {
    id: -1,
    name: '',
    flatNo: '',
    area: '',
    city: '',
    state: '',
    pin: '',
    clientType: '',
    mobile: '',
    clientEmail: '',
    pan: '',
    doiOrDob: '',
    responsiblePersonName: '',
    responsiblePersonPAN: '',
    responsiblePersonDOB: '',
    responsiblePersonAadhaar: ''
  };
  constructor(private apiService: SyncupApiService) { }

  ngOnInit() {
  }

  toggleElements(clientType: HTMLSelectElement) {
    if (clientType.value === 'individual') {
      document.getElementById('responsiblePersonName').style.display = 'none';
      document.getElementById('responsiblePersonDOB').style.display = 'none';
      document.getElementById('responsiblePersonPAN').style.display = 'none';
      document.getElementById('responsiblePersonAadhaar').style.display = 'inline';
      document.getElementById('labelResponsiblePersonName').style.display = 'none';
      document.getElementById('labelResponsiblePersonDOB').style.display = 'none';
      document.getElementById('labelResponsiblePersonPAN').style.display = 'none';
      document.getElementById('labelResponsiblePersonAadhaar').style.display = 'inline';
    } else {
      document.getElementById('responsiblePersonName').style.display = 'inline';
      document.getElementById('responsiblePersonDOB').style.display = 'inline';
      document.getElementById('responsiblePersonPAN').style.display = 'inline';
      document.getElementById('responsiblePersonAadhaar').style.display = 'none';
      document.getElementById('labelResponsiblePersonName').style.display = 'inline';
      document.getElementById('labelResponsiblePersonDOB').style.display = 'inline';
      document.getElementById('labelResponsiblePersonPAN').style.display = 'inline';
      document.getElementById('labelResponsiblePersonAadhaar').style.display = 'none';
    }
  }

  createNewClient(): void {
    this.apiService.AddClient(this.clientModel).subscribe(
      res => {
        this.clientModel.id = res;
        alert('Client ' + this.clientModel.name + ' successfully inserted');
      },
      err => {
        alert('oops!!! Somthing went wrong');
      }
    );
  }
}
