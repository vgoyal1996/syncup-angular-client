import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ClientComponent } from './client/client.component';
import { HomeComponent } from './home/home.component';
import { ReturnFormsComponent } from './return-forms/return-forms.component';
import { ClientMasterComponent } from './client-master/client-master.component';
import { EditClientComponent } from './edit-client/edit-client.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {path: 'login', component : LoginComponent},
  {path: 'home', component : HomeComponent},
  {path: 'signup',component : SignupComponent},
  {path: 'addclient',component : ClientComponent},
  {path: 'returnCredentials',loadChildren: () => import(`./return-credentials/return-credentials.module`).then(m=>m.ReturnCredentialsModule) },
  {path: 'returnForms/:type', component: ReturnFormsComponent},
  {path: 'client-master', component: ClientMasterComponent},
  {path: 'edit-client', component: EditClientComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing : true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
