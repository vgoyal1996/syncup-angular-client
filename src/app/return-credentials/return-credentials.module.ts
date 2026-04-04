import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';

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
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatChipsModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatTooltipModule,
    ReturnCredentialsRoutingModule
  ],
  providers: [
    ApplicableReturnFormsService
  ]
})
export class ReturnCredentialsModule { }
