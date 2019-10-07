import {Component} from '@angular/core';
import {Client} from '../model/Client';
import {Router} from '@angular/router';
import {DataTransferService} from '../shared/datatransferservice/data-transfer.service';
import {NgForm} from '@angular/forms';
import {SyncupApiService} from '../shared/api/syncup-api.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {

  constructor(private apiService: SyncupApiService, private router: Router, private dataTransferService: DataTransferService) {
  }

  createNewClient(f: NgForm): void {
    console.log(f);
    if (f.valid) {
      console.log(f.form.controls.clientType.value + 'is working');
      const clientModel: Client = new Client(f);
      this.apiService.addClient(clientModel).subscribe(
        res => {
          // clientModel.id = res;
          this.dataTransferService.setData(res);
          this.router.navigateByUrl('/returnCredentials').then((e) => {
            if (e) {
              console.log('Navigation to return Credentials successful');
            } else {
              console.log('Navigation to return Credentials failed');
            }
          });
          // alert('Client ' + this.clientModel.name + ' successfully inserted');
        },
        err => {
          alert('oops!!! Somthing went wrong');
        }
      );
    } else {
      console.log(f.form.controls.clientType.value + 'is not working');
    }
  }
}
