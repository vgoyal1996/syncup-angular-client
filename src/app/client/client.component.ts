import {Component, OnInit} from '@angular/core';
import {Client} from '../model/Client';
import {Router} from '@angular/router';
import {DataTransferService} from '../shared/data/data-transfer.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SyncupApiService} from '../shared/api/syncup-api.service';
import { NavBarService } from '../nav-bar/nav-bar.service';
import { Constants } from '../shared/global/constants';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  private clientForm: FormGroup;
  private submitted = false;
  private stateList = Constants.STATES_AND_UT_LIST;

  constructor(private apiService: SyncupApiService, private router: Router, 
    private dataTransferService: DataTransferService, private navBar: NavBarService, private formBuilder: FormBuilder) {
      this.clientForm = this.formBuilder.group({
        clientName: this.formBuilder.control('', Validators.required),
        clientCode: this.formBuilder.control('', Validators.required),
        fatherName: this.formBuilder.control('', Validators.required),
        flatNo: this.formBuilder.control('', Validators.required),
        area: this.formBuilder.control('', Validators.required),
        state: this.formBuilder.control('', Validators.required),
        city: this.formBuilder.control('', Validators.required),
        pin: this.formBuilder.control('', Validators.required),
        clientType: this.formBuilder.control('', Validators.required),
        mobile: this.formBuilder.control('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
        emailId: this.formBuilder.control('', [Validators.required, Validators.email]),
        pan: this.formBuilder.control('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]')]),
        dobOrDoi: this.formBuilder.control('', Validators.required),
        responsiblePersonName: this.formBuilder.control(''),
        responsiblePersonPan: this.formBuilder.control(''),
        responsiblePersonDob: this.formBuilder.control(''),
        responsiblePersonAadhaar: this.formBuilder.control(''),
        cin: this.formBuilder.control('')
      });
  }

  get clientName() {
    return this.clientForm.get('clientName');
  }

  get clientCode() {
    return this.clientForm.get('clientCode');
  }

  get flatNo() {
    return this.clientForm.get('flatNo');
  }

  get area() {
    return this.clientForm.get('area');
  }

  get state() {
    return this.clientForm.get('state');
  }

  get city() {
    return this.clientForm.get('city');
  }

  get pin() {
    return this.clientForm.get('pin');
  }

  get clientType() {
    return this.clientForm.get('clientType');
  }

  get mobile() {
    return this.clientForm.get('mobile');
  }

  get emailId() {
    return this.clientForm.get('emailId');
  }

  get pan() {
    return this.clientForm.get('pan');
  }

  get dobOrDoi() {
    return this.clientForm.get('dobOrDoi');
  }

  get responsiblePersonName() {
    return this.clientForm.get('responsiblePersonName');
  }

  get responsiblePersonPan() {
    return this.clientForm.get('responsiblePersonPan');
  }

  get responsiblePersonDob() {
    return this.clientForm.get('responsiblePersonDob');
  }

  get responsiblePersonAadhaar() {
    return this.clientForm.get('responsiblePersonAadhaar');
  }

  get cin() {
    return this.clientForm.get('cin');
  }

  get fatherName() {
    return this.clientForm.get('fatherName');
  }

  setOptionalValidations() {
    const responsiblePersonNameControl = this.clientForm.get('responsiblePersonName');
    const responsiblePersonPanControl = this.clientForm.get('responsiblePersonPan');
    const responsiblePersonDobControl = this.clientForm.get('responsiblePersonDob');
    const responsiblePersonAadhaarControl = this.clientForm.get('responsiblePersonAadhaar');
    const cinControl = this.clientForm.get('cin');
    this.clientForm.get('clientType').valueChanges.subscribe(
      clientType => {
        if (clientType == "company" || clientType == "llp") {
          cinControl.setValidators([Validators.required, Validators.maxLength(21), Validators.minLength(21)]);
        } else {
          cinControl.setValidators(null);
        }
        if (clientType == "individual") {
          responsiblePersonAadhaarControl.setValidators([Validators.required, Validators.maxLength(12), Validators.minLength(12)]);
        } else {
          responsiblePersonAadhaarControl.setValidators(null);
        }
        if (clientType !== "" && clientType !== "individual") {
          responsiblePersonNameControl.setValidators([Validators.required]);
          responsiblePersonPanControl.setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]')]);
          responsiblePersonDobControl.setValidators([Validators.required]);
        } else {
          responsiblePersonNameControl.setValidators(null);
          responsiblePersonDobControl.setValidators(null);
          responsiblePersonPanControl.setValidators(null);
        }
        cinControl.updateValueAndValidity();
        responsiblePersonAadhaarControl.updateValueAndValidity();
        responsiblePersonDobControl.updateValueAndValidity();
        responsiblePersonNameControl.updateValueAndValidity();
        responsiblePersonPanControl.updateValueAndValidity();
      }
    );
  }

  ngOnInit() {
    this.navBar.show();
    this.navBar.changeToolBarTitle("Add Client");
    this.setOptionalValidations();
  }

  createNewClient(): void {
    this.submitted = true;
    if (this.clientForm.invalid) {
      console.log(this.clientForm);
      return;
    }
    console.log(this.clientForm.value);
    const newClient: Client = new Client();
    newClient.setFieldsFromForm(this.clientForm);
    this.apiService.addClient(newClient).subscribe(
      res => {
        newClient.setId = res;
        console.log(res);
        this.dataTransferService.changeMessage(res);
        this.dataTransferService.updateClient(this.clientForm.get('clientType').value);
        this.router.navigateByUrl('/returnCredentials').then((e) => {
          if (e) {
            console.log('Navigation to return Credentials successful');
          } else {
            console.log('Navigation to return Credentials failed');
          }
        });
      },
      err => {
        alert('oops!!! Something went wrong');
      }
    );
  }
}
