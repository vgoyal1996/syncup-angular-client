import { Component, OnInit } from '@angular/core';
import {SyncupApiService} from 'src/app/shared/api/syncup-api.service';
import {FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-tds-return',
  templateUrl: './tds-return.component.html',
  styleUrls: ['./tds-return.component.css']
})
export class TdsReturnComponent implements OnInit {

  private tdsReturnForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: SyncupApiService) {
    this.tdsReturnForm = formBuilder.group({
                    tdsTanNo: [''],
                    tdsUserName: [''],
                    rocPassword: [''],
                    tracesTdsUserName: [''],
                    tracesTdsPassword: ['']
                  });
   }

  ngOnInit() {
  }

  private addTdsReturnInfo() {
    console.log(this.tdsReturnForm.value);
  }

}
