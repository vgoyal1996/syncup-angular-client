import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ReturnCredentialsComponent } from './return-credentials/return-credentials.component';
import { ClientComponent } from './client/client.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {path: 'login', component : LoginComponent},
  {path: 'signup',component : SignupComponent},
  {path: 'addclient',component : ClientComponent},
  {path: 'returnCredentials',loadChildren: () => import(`./return-credentials/return-credentials.module`).then(m=>m.ReturnCredentialsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing : true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
