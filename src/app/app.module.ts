import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientComponent } from './client/client.component';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ReturnCredentialsComponent } from './return-credentials/return-credentials.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ConfirmEqualValidatorDirective } from './shared/confirm-equal-validator.directive';

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
    ConfirmEqualValidatorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbPaginationModule,
    NgbAlertModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {enableTracing : true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
