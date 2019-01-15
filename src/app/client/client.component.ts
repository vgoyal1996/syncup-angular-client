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
    clientType: 'individual',
    mobile: '',
    clientEmail: '',
    pan: '',
    doiOrDob: '',
    responsiblePersonName: '',
    responsiblePersonPAN: '',
    responsiblePersonDOB: '',
    responsiblePersonAadhaar: '',
    cin: ''
  };
  constructor(private apiService: SyncupApiService) { }

  ngOnInit() {
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
