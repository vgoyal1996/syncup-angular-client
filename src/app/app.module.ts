import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientComponent } from './client/client.component';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ConfirmEqualValidatorDirective } from './shared/validators/confirm-equal-validator/confirm-equal-validator.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { ReturnFormsComponent } from './return-forms/return-forms.component';
import { AddReturnFormDialogComponent } from './return-forms/add-return-form-dialog/add-return-form-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { EditReturnFormDialogComponent } from './return-forms/edit-return-form-dialog/edit-return-form-dialog.component';
import { DeleteReturnFormsDialogComponent } from './return-forms/delete-return-forms-dialog/delete-return-forms-dialog.component';
import { DataTransferService } from './shared/data/data-transfer.service';
import { NavBarService } from './nav-bar/nav-bar.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    LoginComponent,
    SignupComponent,
    ConfirmEqualValidatorDirective,
    HomeComponent,
    ReturnFormsComponent,
    AddReturnFormDialogComponent,
    EditReturnFormDialogComponent,
    DeleteReturnFormsDialogComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbPaginationModule,
    NgbAlertModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatExpansionModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSnackBarModule,
  ],
  entryComponents: [
    AddReturnFormDialogComponent,
    EditReturnFormDialogComponent,
    DeleteReturnFormsDialogComponent
  ],
  providers: [
    DatePipe,
    DataTransferService,
    NavBarService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
