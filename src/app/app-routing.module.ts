import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth/auth.guard';
import { SignupComponent } from './signup/signup.component';
import { ClientComponent } from './client/client.component';
import { HomeComponent } from './home/home.component';
import { ReturnFormsComponent } from './return-forms/return-forms.component';
import { ClientMasterComponent } from './client-master/client-master.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { PrintLayoutComponent } from './print-layout/print-layout.component';
import { ClientReportComponent } from './client-report/client-report.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'addclient', component: ClientComponent },
      { path: 'returnCredentials', loadChildren: () => import(`./return-credentials/return-credentials.module`).then(m => m.ReturnCredentialsModule) },
      { path: 'returnForms/:type', component: ReturnFormsComponent },
      { path: 'client-master', component: ClientMasterComponent },
      { path: 'edit-client', component: EditClientComponent },
      { path: 'selected-client-master', loadChildren: () => import(`./selected-client-master/selected-client-master.module`).then(m => m.SelectedClientMasterModule) },
      {
        path: 'print', component: PrintLayoutComponent, outlet: 'printOutlet', children: [
          { path: 'client-report/:clientId', component: ClientReportComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
