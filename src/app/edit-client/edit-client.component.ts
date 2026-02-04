import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SyncupApiService } from '../shared/api/syncup-api.service';
import { NavBarService } from '../nav-bar/nav-bar.service';
import { Client } from '../model/Client';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataTransferService } from '../shared/data/data-transfer.service';
import { Constants } from '../shared/global/constants';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css'],
  standalone: false
})
export class EditClientComponent implements OnInit {

  editClientForm: FormGroup;
  oldClient: any;
  submitted = false;
  oldClientCode: string;
  stateList = Constants.STATES_AND_UT_LIST;
  filteredStates: Observable<any[]>;

  constructor(private formBuilder: FormBuilder, private apiService: SyncupApiService,
    private navBar: NavBarService, private snackBar: MatSnackBar,
    private router: Router, private dataTransferService: DataTransferService) {
    this.editClientForm = this.formBuilder.group({
      // ... existing controls ...
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
        // Correctly set state value. Old code set object, but let's stick to the value string for consistency 
        // if the form control expects what autocomplete provides (value string).
        // However, EditClient component previously used OBJECT. If I change it to string, 
        // I must ensure setFieldsFromForm handles it.
        // Wait, Client.ts setFieldsFromForm uses .value.
        // If I change EditClient to use String, I align with Add Client. 
        // Let's use String 'value'.
        // The old code: this.stateList.find...
        // this.editClientForm.controls['state'].setValue(object)
        // I will change it to set just the value string, matching Add Client.
        this.editClientForm.controls['state'].setValue(this.oldClient.state);

        this.oldClientCode = this.oldClient.clientCode;
      }
    );
  }

  // ... getters ...
  get clientName() { return this.editClientForm.get('clientName'); }
  get clientCode() { return this.editClientForm.get('clientCode'); }
  get flatNo() { return this.editClientForm.get('flatNo'); }
  get area() { return this.editClientForm.get('area'); }
  get state() { return this.editClientForm.get('state'); }
  get city() { return this.editClientForm.get('city'); }
  get pin() { return this.editClientForm.get('pin'); }
  get clientType() { return this.editClientForm.get('clientType'); }
  get mobile() { return this.editClientForm.get('mobile'); }
  get emailId() { return this.editClientForm.get('emailId'); }
  get pan() { return this.editClientForm.get('pan'); }
  get dobOrDoi() { return this.editClientForm.get('dobOrDoi'); }
  get responsiblePersonName() { return this.editClientForm.get('responsiblePersonName'); }
  get responsiblePersonPan() { return this.editClientForm.get('responsiblePersonPan'); }
  get responsiblePersonDob() { return this.editClientForm.get('responsiblePersonDob'); }
  get responsiblePersonAadhaar() { return this.editClientForm.get('responsiblePersonAadhaar'); }
  get cin() { return this.editClientForm.get('cin'); }
  get fatherName() { return this.editClientForm.get('fatherName'); }

  setOptionalValidations() {
    const responsiblePersonNameControl = this.editClientForm.get('responsiblePersonName');
    const responsiblePersonPanControl = this.editClientForm.get('responsiblePersonPan');
    const responsiblePersonDobControl = this.editClientForm.get('responsiblePersonDob');
    const responsiblePersonAadhaarControl = this.editClientForm.get('responsiblePersonAadhaar');
    const cinControl = this.editClientForm.get('cin');
    const mobileControl = this.editClientForm.get('mobile');
    const panControl = this.editClientForm.get('pan');

    // Strict Mobile Validation: Starts with 6-9, followed by 9 digits
    mobileControl.setValidators([Validators.required, Validators.pattern('^[6-9][0-9]{9}$')]);

    this.editClientForm.get('clientType').valueChanges.subscribe(
      clientType => {
        // Reset validators first
        cinControl.setValidators(null);
        responsiblePersonAadhaarControl.setValidators(null);
        responsiblePersonNameControl.setValidators(null);
        responsiblePersonPanControl.setValidators(null);
        responsiblePersonDobControl.setValidators(null);

        let panPattern = '[A-Z]{5}[0-9]{4}[A-Z]'; // Default loose pattern

        // Dynamic PAN Regex based on Client Type
        switch (clientType) {
          case 'individual': panPattern = '[A-Z]{3}P[A-Z][0-9]{4}[A-Z]'; break;
          case 'company': panPattern = '[A-Z]{3}C[A-Z][0-9]{4}[A-Z]'; break;
          case 'llp': panPattern = '[A-Z]{3}F[A-Z][0-9]{4}[A-Z]'; break;
          case 'trust': panPattern = '[A-Z]{3}T[A-Z][0-9]{4}[A-Z]'; break;
          case 'huf': panPattern = '[A-Z]{3}H[A-Z][0-9]{4}[A-Z]'; break;
          case 'firm': panPattern = '[A-Z]{3}F[A-Z][0-9]{4}[A-Z]'; break;
          case 'association_of_persons': panPattern = '[A-Z]{3}A[A-Z][0-9]{4}[A-Z]'; break;
          case 'body_of_individuals': panPattern = '[A-Z]{3}B[A-Z][0-9]{4}[A-Z]'; break;
          case 'local_authority': panPattern = '[A-Z]{3}L[A-Z][0-9]{4}[A-Z]'; break;
          case 'artificial_juridical_person': panPattern = '[A-Z]{3}J[A-Z][0-9]{4}[A-Z]'; break;
          case 'government': panPattern = '[A-Z]{3}G[A-Z][0-9]{4}[A-Z]'; break;
        }

        // Apply PAN Validator
        panControl.setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(panPattern)]);
        panControl.updateValueAndValidity();

        // CIN Validation for Company
        if (clientType == "company" || clientType == "llp") {
          const cinRegex = '^[LU][0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$';
          if (clientType === 'company') {
            cinControl.setValidators([Validators.required, Validators.pattern(cinRegex)]);
          } else {
            cinControl.setValidators([Validators.required, Validators.minLength(21), Validators.maxLength(21)]);
          }
        }

        // Aadhaar Validation for Individual
        if (clientType == "individual") {
          responsiblePersonAadhaarControl.setValidators([Validators.required, Validators.pattern('^[2-9][0-9]{11}$')]);
        }

        // Responsible Person Validations (for Non-Individual)
        if (clientType !== "" && clientType !== "individual") {
          responsiblePersonNameControl.setValidators([Validators.required]);
          responsiblePersonPanControl.setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]')]);
          responsiblePersonDobControl.setValidators([Validators.required]);
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

    this.filteredStates = this.state.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.stateList.filter(option => option.display.toLowerCase().includes(filterValue));
  }

  displayFn(value: string): string {
    if (!value) return '';
    const selectedState = Constants.STATES_AND_UT_LIST.find(state => state.value === value);
    return selectedState ? selectedState.display : value;
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
