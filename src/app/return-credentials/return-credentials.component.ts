import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators, NgForm, Form, FormArray} from '@angular/forms';
import {ReturnCredentials} from '../model/ReturnCredentials';
//import {DataTransferService} from '../shared/datatransferservice/data-transfer.service';
import {SyncupApiService} from '../shared/api/syncup-api.service';

@Component({
  selector: 'app-return-credentials',
  templateUrl: './return-credentials.component.html',
  styleUrls: ['./return-credentials.component.css']
})
export class ReturnCredentialsComponent implements OnInit {

  private incomeTaxReturnForm: FormGroup;
  private gstReturnForm: FormGroup;
  private tdsReturnForm: FormGroup;
  private rocReturnForm: FormGroup;

  ngOnInit() {
  }

  constructor(private formBuilder: FormBuilder, private apiService: SyncupApiService) {
      this.incomeTaxReturnForm = formBuilder.group({
        incomeTaxUserName: '',
        incomeTaxPassword: ''
      });

      this.tdsReturnForm = formBuilder.group({
        tdsTanNo: '',
        tdsUserName: '',
        tdsPassword: '',
        tracesTdsUserName: '',
        tracesTdsPassword: ''
      });

      this.rocReturnForm = formBuilder.group({
        rocUserName: '',
        rocPassword: ''
      });

  }

  get incomeTaxUserName() {
    return this.incomeTaxReturnForm.get('incomeTaxUserName').value;
  }

  get incomeTaxPassword() {
    return this.incomeTaxReturnForm.get('incomeTaxPassword').value;
  }

  public addRocReturnInfo() {

  }

  public addIncomeTaxReturnInfo() {

  }

  public addGstReturnInfo() {

  }

  public addtdsReturnInfo() {

  }

  // incomeTaxReturnCredentialsModel: ReturnCredentials = {
  //   returnId: -1,
  //   id: -1,
  //   returnType: '',
  //   gstNo: '',
  //   tanNo: '',
  //   flatNo: '',
  //   area: '',
  //   city: '',
  //   state: '',
  //   pin: '',
  //   userId: '',
  //   password: '',
  //   tracesUserId: '',
  //   tracesPassword: ''
  // };
  //
  // tdsReturnCredentialsModel: ReturnCredentials = {
  //   returnId: -1,
  //   id: -1,
  //   returnType: '',
  //   gstNo: '',
  //   tanNo: '',
  //   flatNo: '',
  //   area: '',
  //   city: '',
  //   state: '',
  //   pin: '',
  //   userId: '',
  //   password: '',
  //   tracesUserId: '',
  //   tracesPassword: ''
  // };
  //
  // rocReturnCredentialsModel: ReturnCredentials = {
  //   returnId: -1,
  //   id: -1,
  //   returnType: '',
  //   gstNo: '',
  //   tanNo: '',
  //   flatNo: '',
  //   area: '',
  //   city: '',
  //   state: '',
  //   pin: '',
  //   userId: '',
  //   password: '',
  //   tracesUserId: '',
  //   tracesPassword: ''
  // };

  // isIncomeTaxChecked = false;
  // isGstChecked = false;
  // isTdsChecked = false;
  // isRocChecked = false;
  // returnsArray: ReturnCredentials[] = [];
  // gstVariableList: ReturnCredentials[] = [];
  //
  // private clientId = this.dataTransferService.getData();
  //
  // returnForm: FormGroup;
  // incomeTaxForm: FormGroup;
  // gstForm: FormGroup;
  // tdsForm: FormGroup;
  // rocForm: FormGroup;
  //
  // constructor(private formBuilder: FormBuilder, private dataTransferService: DataTransferService, private apiService: SyncupApiService) {
  //
  //   this.incomeTaxForm = formBuilder.group({
  //     incomeTaxUserName: '',
  //     incomeTaxPassword: ''
  //   });
  //
  //   this.tdsForm = formBuilder.group({
  //     tdsTanNo: '',
  //     tdsUserName: '',
  //     tdsPassword: '',
  //     tracesTdsUserName: '',
  //     tracesTdsPassword: ''
  //   });
  //
  //   this.rocForm = formBuilder.group({
  //     rocUserName: '',
  //     rocPassword: ''
  //   });
  //
  //   this.returnForm = formBuilder.group({
  //     incomeTaxForm: this.incomeTaxForm,
  //     gstForm: formBuilder.array([]),
  //     tdsForm: this.tdsForm,
  //     rocForm: this.rocForm
  //   });
  // }
  //
  //
  // get gstUserNameAndPasswordForms() {
  //   return this.returnForm.get('gstForm') as FormArray;
  // }
  //
  addGstUserNameAndPasswordForm() {

  }
  //
  deleteGstUserNameAndPasswordForm(i) {
    // this.gstUserNameAndPasswordForms.removeAt(i);
  }
  //
  // setIncomeTaxCheckBox() {
  //   this.isIncomeTaxChecked = !this.isIncomeTaxChecked;
  // }
  //
  // setGstCheckBox() {
  //   this.isGstChecked = !this.isGstChecked;
  // }
  //
  // setTdsCheckBox() {
  //   this.isTdsChecked = !this.isTdsChecked;
  // }
  //
  // setRocCheckBox() {
  //   this.isRocChecked = !this.isRocChecked;
  // }

  // addReturnInfo() {
  //   let y = 0;
  //   if (this.incomeTaxForm.controls['incomeTaxUserName'].value !== ''
  //     && this.incomeTaxForm.controls['incomeTaxPassword'].value !== '') {
  //     this.incomeTaxReturnCredentialsModel.id = this.clientId;
  //     this.incomeTaxReturnCredentialsModel.returnType = 'incomeTax';
  //     this.incomeTaxReturnCredentialsModel.gstNo = '';
  //     this.incomeTaxReturnCredentialsModel.tanNo = '';
  //     this.incomeTaxReturnCredentialsModel.flatNo = '';
  //     this.incomeTaxReturnCredentialsModel.area = '';
  //     this.incomeTaxReturnCredentialsModel.city = '';
  //     this.incomeTaxReturnCredentialsModel.state = '';
  //     this.incomeTaxReturnCredentialsModel.pin = '';
  //     this.incomeTaxReturnCredentialsModel.userId = this.incomeTaxForm.controls['incomeTaxUserName'].value;
  //     this.incomeTaxReturnCredentialsModel.password = this.incomeTaxForm.controls['incomeTaxPassword'].value;
  //     this.incomeTaxReturnCredentialsModel.tracesUserId = '';
  //     this.incomeTaxReturnCredentialsModel.tracesPassword = '';
  //     this.returnsArray.push(this.incomeTaxReturnCredentialsModel);
  //   }
  //
  //   if (this.tdsForm.controls['tdsUserName'].value !== '' && this.tdsForm.controls['tdsPassword'].value !== '' &&
  //     this.tdsForm.controls['tracesTdsUserName'].value !== '' && this.tdsForm.controls['tracesTdsPassword'].value !== '') {
  //     this.tdsReturnCredentialsModel.id = this.clientId;
  //     this.tdsReturnCredentialsModel.returnType = 'tds';
  //     this.tdsReturnCredentialsModel.gstNo = '';
  //     this.tdsReturnCredentialsModel.tanNo = this.tdsForm.controls['tdsTanNo'].value;
  //     this.tdsReturnCredentialsModel.flatNo = '';
  //     this.tdsReturnCredentialsModel.area = '';
  //     this.tdsReturnCredentialsModel.city = '';
  //     this.tdsReturnCredentialsModel.state = '';
  //     this.tdsReturnCredentialsModel.pin = '';
  //     this.tdsReturnCredentialsModel.userId = this.tdsForm.controls['tdsUserName'].value;
  //     this.tdsReturnCredentialsModel.password = this.tdsForm.controls['tdsPassword'].value;
  //     this.tdsReturnCredentialsModel.tracesUserId = this.tdsForm.controls['tracesTdsUserName'].value;
  //     this.tdsReturnCredentialsModel.tracesPassword = this.tdsForm.controls['tracesTdsPassword'].value;
  //     this.returnsArray.push(this.tdsReturnCredentialsModel);
  //   }
  //
  //   if (this.rocForm.controls['rocUserName'].value !== '' && this.rocForm.controls['rocPassword'].value !== '') {
  //     this.rocReturnCredentialsModel.id = this.clientId;
  //     this.rocReturnCredentialsModel.returnType = 'roc';
  //     this.rocReturnCredentialsModel.gstNo = '';
  //     this.rocReturnCredentialsModel.tanNo = '';
  //     this.rocReturnCredentialsModel.flatNo = '';
  //     this.rocReturnCredentialsModel.area = '';
  //     this.rocReturnCredentialsModel.city = '';
  //     this.rocReturnCredentialsModel.state = '';
  //     this.rocReturnCredentialsModel.pin = '';
  //     this.rocReturnCredentialsModel.userId = this.rocForm.controls['rocUserName'].value;
  //     this.rocReturnCredentialsModel.password = this.rocForm.controls['rocPassword'].value;
  //     this.rocReturnCredentialsModel.tracesUserId = '';
  //     this.rocReturnCredentialsModel.tracesPassword = '';
  //     this.returnsArray.push(this.rocReturnCredentialsModel);
  //   }
  //
  //   for (const control of this.gstUserNameAndPasswordForms.controls) {
  //     if (control.get('gstFlatNo').value !== '' &&
  //       control.get('gstArea').value !== '' &&
  //       control.get('gstCity').value !== '' &&
  //       control.get('gstState').value !== '' &&
  //       control.get('gstPin').value !== '' &&
  //       control.get('gstNo').value !== '' &&
  //       control.get('gstUserName').value !== '' &&
  //       control.get('gstPassword').value !== '') {
  //       this.gstVariableList[y].id = this.clientId;
  //       this.gstVariableList[y].returnType = 'gst';
  //       this.gstVariableList[y].gstNo = control.get('gstNo').value;
  //       this.gstVariableList[y].tanNo = '';
  //       this.gstVariableList[y].flatNo = control.get('gstFlatNo').value;
  //       this.gstVariableList[y].area = control.get('gstArea').value;
  //       this.gstVariableList[y].city = control.get('gstCity').value;
  //       this.gstVariableList[y].state = control.get('gstState').value;
  //       this.gstVariableList[y].pin = control.get('gstPin').value;
  //       this.gstVariableList[y].userId = control.get('gstUserName').value;
  //       this.gstVariableList[y].password = control.get('gstPassword').value;
  //       this.gstVariableList[y].tracesUserId = '';
  //       this.gstVariableList[y].tracesPassword = '';
  //       this.returnsArray.push(this.gstVariableList[y]);
  //       y++;
  //     }
  //   }

  //   this.apiService.addReturnCredentials(this.returnsArray).subscribe(
  //     res => {
  //       console.log('return Credentials successfully added');
  //       alert('return Credentials successfully added');
  //     },
  //     err => {
  //       console.log('return credentials addition failed');
  //       alert('return credentials addition failed');
  //     }
  //   );
  // }
}
