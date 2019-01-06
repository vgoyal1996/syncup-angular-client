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
    address: '',
    clientType: '',
    mobile: '',
    clientEmail: '',
    doiOrDob: '',
    responsiblePersonName: '',
    responsiblePersonPAN: '',
    responsiblePersonDOB: '',
    responsiblePersonAadhaar: '',
    gstNo: '',
    cinNo: '',
    tanNo: ''
  };
  constructor(private apiService: SyncupApiService) { }

  ngOnInit() {
  }

  toggleElements(clientType: HTMLInputElement) {
    if (clientType.value === 'individual') {
      document.getElementById('responsiblePersonName').style.display = 'none';
      document.getElementById('responsiblePersonDOB').style.display = 'none';
      document.getElementById('labelResponsiblePersonName').style.display = 'none';
      document.getElementById('labelResponsiblePersonDOB').style.display = 'none';
    } else {
      document.getElementById('responsiblePersonName').style.display = 'inline';
      document.getElementById('responsiblePersonDOB').style.display = 'inline';
      document.getElementById('labelResponsiblePersonName').style.display = 'inline';
      document.getElementById('labelResponsiblePersonDOB').style.display = 'inline';
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
