import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { ReturnCredentialsRoutingModule } from './return-credentials-routing.module';
import { RocReturnComponent } from './roc-return/roc-return.component';
import { IncomeTaxReturnComponent } from './income-tax-return/income-tax-return.component';
import { GstReturnComponent } from './gst-return/gst-return.component';
import { TdsReturnComponent } from './tds-return/tds-return.component';
import { ReturnCredentialsComponent } from './return-credentials.component';
import { ApplicableReturnFormsService } from './applicable-return-forms.service';

@NgModule({
  declarations: [
    ReturnCredentialsComponent,
    IncomeTaxReturnComponent,
    GstReturnComponent,
    TdsReturnComponent,
    RocReturnComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    FormsModule,
    MatCheckboxModule,
    MatTableModule,
    ReactiveFormsModule, 
    ReturnCredentialsRoutingModule
  ],
  providers: [
    ApplicableReturnFormsService
  ]
})
export class ReturnCredentialsModule { }
