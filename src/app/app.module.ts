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
import { HomeComponent } from './home/home.component';
import { ReturnFormComponent } from './return-form/return-form.component';

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
    path : 'home',
    component : HomeComponent
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
    HomeComponent,
    ReturnFormComponent
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
