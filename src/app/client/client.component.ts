import { Component, OnInit } from '@angular/core';
import { Client } from '../model/Client';
import { Router } from '@angular/router';
import { DataTransferService } from '../shared/data/data-transfer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SyncupApiService } from '../shared/api/syncup-api.service';
import { NavBarService } from '../nav-bar/nav-bar.service';
import { Constants } from '../shared/global/constants';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
  standalone: false
})
export class ClientComponent implements OnInit {

  clientForm: FormGroup;
  submitted = false;
  stateList = Constants.STATES_AND_UT_LIST;
  filteredStates: Observable<any[]>;

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

  // ... getters ...
  get clientName() { return this.clientForm.get('clientName'); }
  get clientCode() { return this.clientForm.get('clientCode'); }
  get flatNo() { return this.clientForm.get('flatNo'); }
  get area() { return this.clientForm.get('area'); }
  get state() { return this.clientForm.get('state'); }
  get city() { return this.clientForm.get('city'); }
  get pin() { return this.clientForm.get('pin'); }
  get clientType() { return this.clientForm.get('clientType'); }
  get mobile() { return this.clientForm.get('mobile'); }
  get emailId() { return this.clientForm.get('emailId'); }
  get pan() { return this.clientForm.get('pan'); }
  get dobOrDoi() { return this.clientForm.get('dobOrDoi'); }
  get responsiblePersonName() { return this.clientForm.get('responsiblePersonName'); }
  get responsiblePersonPan() { return this.clientForm.get('responsiblePersonPan'); }
  get responsiblePersonDob() { return this.clientForm.get('responsiblePersonDob'); }
  get responsiblePersonAadhaar() { return this.clientForm.get('responsiblePersonAadhaar'); }
  get cin() { return this.clientForm.get('cin'); }
  get fatherName() { return this.clientForm.get('fatherName'); }

  setOptionalValidations() {
    const responsiblePersonNameControl = this.clientForm.get('responsiblePersonName');
    const responsiblePersonPanControl = this.clientForm.get('responsiblePersonPan');
    const responsiblePersonDobControl = this.clientForm.get('responsiblePersonDob');
    const responsiblePersonAadhaarControl = this.clientForm.get('responsiblePersonAadhaar');
    const cinControl = this.clientForm.get('cin');
    const mobileControl = this.clientForm.get('mobile');
    const panControl = this.clientForm.get('pan');

    // Strict Mobile Validation: Starts with 6-9, followed by 9 digits
    mobileControl.setValidators([Validators.required, Validators.pattern('^[6-9][0-9]{9}$')]);

    this.clientForm.get('clientType').valueChanges.subscribe(
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
        if (clientType == "company" || clientType == "llp") { // Note: LLPs have LLPIN but some use CIN field. Sticking to current logic but making plain company stricter.
          // Actually, LLP uses LLPIN which is different. The previous code applied CIN logic to LLP too.
          // I will apply the Strict CIN regex only if it is a company, or keep it generic if they share the field.
          // Researched CIN is 21 chars. LLPIN is different.
          // For now, I will apply Strict CIN regex.
          const cinRegex = '^[LU][0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$';
          // Note: Regex above is strict. existing validation was just length 21. 
          // If user selects LLP, they might need LLPIN which looks like "AAA-1234".
          // The prompt asked for "Strict CIN Format (For Companies)". 
          // I will apply strict CIN to 'company' and just length/required to 'llp' to be safe, or just strict CIN if they asked for it.
          // Let's stick to the prompt's request: "Strict CIN Format (For Companies)".
          if (clientType === 'company') {
            cinControl.setValidators([Validators.required, Validators.pattern(cinRegex)]);
          } else {
            // For LLP, keep rudimentary length check or requested '21' if they use the same field in DB
            cinControl.setValidators([Validators.required, Validators.minLength(21), Validators.maxLength(21)]);
          }
        }

        // Aadhaar Validation for Individual
        if (clientType == "individual") {
          // Strict Aadhaar: Starts with 2-9, 12 digits total
          responsiblePersonAadhaarControl.setValidators([Validators.required, Validators.pattern('^[2-9][0-9]{11}$')]);
        }

        // Responsible Person Validations (for Non-Individual)
        if (clientType !== "" && clientType !== "individual") {
          responsiblePersonNameControl.setValidators([Validators.required]);
          // Responsible Person PAN is always Individual-like? usually. But regex was generic before.
          // Let's keep the generic PAN pattern for Responsible Person as it's likely a person.
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
    this.navBar.changeToolBarTitle("Add Client");
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
        this.router.navigateByUrl('/client-master');
      },
      err => {
        alert('oops!!! Something went wrong');
      }
    );
  }
}
