import { Component, OnInit } from '@angular/core';
import {Client} from '../model/Client';

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
    client_type: '',
    doi_or_dob: '',
    responsible_person_name: '',
    responsible_person_PAN: '',
    responsible_person_DOB: '',
    responsible_person_aadhaar: ''
  };
  constructor() { }

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
}
