import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SyncupApiService } from '../shared/api/syncup-api.service';
import { NavBarService } from '../nav-bar/nav-bar.service';
import { Client } from '../model/Client';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { DataTransferService } from '../shared/data/data-transfer.service';
import { Constants } from '../shared/global/constants';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  private editClientForm: FormGroup;
  private oldClient: any;
  submitted = false;
  private oldClientCode: string;
  private stateList = Constants.STATES_AND_UT_LIST;

  constructor(private formBuilder: FormBuilder, private apiService: SyncupApiService,
    private navBar: NavBarService, private snackBar: MatSnackBar,
    private router: Router, private dataTransferService: DataTransferService) {
    this.editClientForm = this.formBuilder.group({
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
    this.dataTransferService.currentClientObject.subscribe(
      clientObject => {
        this.oldClient = clientObject;
        this.stateList = Constants.STATES_AND_UT_LIST;
        this.editClientForm.patchValue({
          clientName: this.oldClient.name,
          clientCode: this.oldClient.clientCode,
          fatherName: this.oldClient.fatherName,
          flatNo: this.oldClient.flatNo,
          area: this.oldClient.area,
          state: this.stateList[this.stateList.findIndex(obj => obj.value == this.oldClient.state)].display,
          city: this.oldClient.city,
          pin: this.oldClient.pin,
          clientType: this.oldClient.clientType,
          mobile: this.oldClient.mobile,
          emailId: this.oldClient.clientEmail,
          pan: this.oldClient.pan,
          dobOrDoi: this.oldClient.doiOrDob,
          responsiblePersonName: this.oldClient.responsiblePersonName,
          responsiblePersonPan: this.oldClient.responsiblePersonPAN,
          responsiblePersonDob: this.oldClient.responsiblePersonDOB,
          responsiblePersonAadhaar: this.oldClient.responsiblePersonAadhaar,
          cin: this.oldClient.cin
        });
        this.oldClientCode = this.oldClient.clientCode;
      }
    );
  }

  get clientName() {
    return this.editClientForm.get('clientName');
  }

  get clientCode() {
    return this.editClientForm.get('clientCode');
  }

  get flatNo() {
    return this.editClientForm.get('flatNo');
  }

  get area() {
    return this.editClientForm.get('area');
  }

  get state() {
    return this.editClientForm.get('state');
  }

  get city() {
    return this.editClientForm.get('city');
  }

  get pin() {
    return this.editClientForm.get('pin');
  }

  get clientType() {
    return this.editClientForm.get('clientType');
  }

  get mobile() {
    return this.editClientForm.get('mobile');
  }

  get emailId() {
    return this.editClientForm.get('emailId');
  }

  get pan() {
    return this.editClientForm.get('pan');
  }

  get dobOrDoi() {
    return this.editClientForm.get('dobOrDoi');
  }

  get responsiblePersonName() {
    return this.editClientForm.get('responsiblePersonName');
  }

  get responsiblePersonPan() {
    return this.editClientForm.get('responsiblePersonPan');
  }

  get responsiblePersonDob() {
    return this.editClientForm.get('responsiblePersonDob');
  }

  get responsiblePersonAadhaar() {
    return this.editClientForm.get('responsiblePersonAadhaar');
  }

  get cin() {
    return this.editClientForm.get('cin');
  }

  get fatherName() {
    return this.editClientForm.get('fatherName');
  }

  setOptionalValidations() {
    const responsiblePersonNameControl = this.editClientForm.get('responsiblePersonName');
    const responsiblePersonPanControl = this.editClientForm.get('responsiblePersonPan');
    const responsiblePersonDobControl = this.editClientForm.get('responsiblePersonDob');
    const responsiblePersonAadhaarControl = this.editClientForm.get('responsiblePersonAadhaar');
    const cinControl = this.editClientForm.get('cin');
    this.editClientForm.get('clientType').valueChanges.subscribe(
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
    this.navBar.changeToolBarTitle("Edit Client");
    this.setOptionalValidations();
  }

  updateClientInfo() {
    this.submitted = true;
    if (this.editClientForm.invalid) {
      return;
    }
    console.log(this.editClientForm.value);
    const newClient: Client = new Client();
    newClient.setFieldsFromForm(this.editClientForm);
    this.apiService.updateClientByClientCode(this.oldClientCode, newClient).subscribe(
      res => {
        if (res == true) {
          console.log("update successful");
          this.snackBar.open("Update successful", null, {
            duration: 3000,
          });
        } else {
          console.log("Update failed");
          this.snackBar.open("Update failed", null, {
            duration: 3000,
          });
        }
        this.router.navigateByUrl("/client-master");
      },
      err => {
        console.log(err);
        this.snackBar.open("OOPS!!! Something went wrong", null, {
          duration: 3000,
        });
      }
    );
  }
}
