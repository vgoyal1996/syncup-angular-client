import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RocReturnComponent } from './roc-return/roc-return.component';
import { IncomeTaxReturnComponent } from './income-tax-return/income-tax-return.component';
import { GstReturnComponent } from './gst-return/gst-return.component';
import { TdsReturnComponent } from './tds-return/tds-return.component';
import { ReturnCredentialsComponent } from './return-credentials.component';


const routes: Routes = [
  {
    path: '', component: ReturnCredentialsComponent, children: [
      {path:'', redirectTo: 'incomeTax', pathMatch:'full'},
      {path:'incomeTax', component:IncomeTaxReturnComponent},
      {path:'tds', component:TdsReturnComponent},
      {path:'roc', component:RocReturnComponent},
      {path:'gst', component:GstReturnComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReturnCredentialsRoutingModule { }
