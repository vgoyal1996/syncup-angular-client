import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { SelectedClientMasterRoutingModule } from './selected-client-master-routing.module';
import { SelectedClientMasterComponent } from './selected-client-master.component';
import { IncomeTaxReturnComponent } from './income-tax-return/income-tax-return.component';
import { GstReturnComponent } from './gst-return/gst-return.component';
import { TdsReturnComponent } from './tds-return/tds-return.component';
import { RocReturnComponent } from './roc-return/roc-return.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectedClientDataService } from './selected-client-data.service';
import { AddReturnInfoDialogComponent } from './add-return-info-dialog/add-return-info-dialog.component';

@NgModule({
  declarations: [
    SelectedClientMasterComponent,
    IncomeTaxReturnComponent,
    GstReturnComponent,
    TdsReturnComponent,
    RocReturnComponent,
    AddReturnInfoDialogComponent,
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    MatButtonModule,
    MatTableModule,
    MatTabsModule,
    FormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    SelectedClientMasterRoutingModule
  ],
  providers: [
    SelectedClientDataService
  ]
})
export class SelectedClientMasterModule { }
