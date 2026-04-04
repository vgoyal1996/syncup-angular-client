import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectedClientMasterComponent } from './selected-client-master.component';
import { IncomeTaxReturnComponent } from './income-tax-return/income-tax-return.component';
import { GstReturnComponent } from './gst-return/gst-return.component';
import { TdsReturnComponent } from './tds-return/tds-return.component';
import { RocReturnComponent } from './roc-return/roc-return.component';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
  {
    path: '', component: SelectedClientMasterComponent, children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: OverviewComponent },
      { path: 'incomeTax', component: IncomeTaxReturnComponent },
      { path: 'tds', component: TdsReturnComponent },
      { path: 'roc', component: RocReturnComponent },
      { path: 'gst', component: GstReturnComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectedClientMasterRoutingModule { }
