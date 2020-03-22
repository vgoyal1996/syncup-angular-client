import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientComponent } from './client/client.component';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ReturnCredentialsComponent } from './return-credentials/return-credentials.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ConfirmEqualValidatorDirective } from './shared/validators/confirm-equal-validator/confirm-equal-validator.directive';
import { IncomeTaxReturnComponent } from './return-credentials/income-tax-return/income-tax-return.component';
import { GstReturnComponent } from './return-credentials/gst-return/gst-return.component';
import { TdsReturnComponent } from './return-credentials/tds-return/tds-return.component';
import { RocReturnComponent } from './return-credentials/roc-return/roc-return.component';

const appRoutes: Routes = [
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'signup',
    component : SignupComponent
  },
  {
    path : 'addclient',
    component : ClientComponent
  },
  {
    path : 'returnCredentials',
    component : ReturnCredentialsComponent
  },
  {
    path : '',
    component : LoginComponent,
    pathMatch : 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    ReturnCredentialsComponent,
    LoginComponent,
    SignupComponent,
    ConfirmEqualValidatorDirective,
    IncomeTaxReturnComponent,
    GstReturnComponent,
    TdsReturnComponent,
    RocReturnComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbPaginationModule,
    NgbAlertModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, {enableTracing : true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
