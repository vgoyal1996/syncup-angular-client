import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddReturnFormDialogComponent } from './add-return-form-dialog/add-return-form-dialog.component';
import { ActivatedRoute } from '@angular/router';
import {SyncupApiService} from '../shared/api/syncup-api.service';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { ReturnForm } from '../model/ReturnForm';
import { MatTable } from '@angular/material/table';
import { EditReturnFormDialogComponent } from './edit-return-form-dialog/edit-return-form-dialog.component';

@Component({
  selector: 'app-return-forms',
  templateUrl: './return-forms.component.html',
  styleUrls: ['./return-forms.component.css']
})
export class ReturnFormsComponent implements OnInit {
  returnType: string;
  displayedColumns: string[] = ['formName', 'periodicity', 'dueDateOfFiling', 'actions'];
  dataSource: any[] = [];
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(private dialog: MatDialog, private router: ActivatedRoute, private apiService: SyncupApiService,
    private datepipe: DatePipe) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddReturnFormDialogComponent, {
      width: '500px',
      height: '450px',
      data: { returnType: this.returnType }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result != undefined) {
        this.onNewReturnFormAdded(result);
      }
    });
  }

  openEditDialog(element: any): void {
    const dialogRef = this.dialog.open(EditReturnFormDialogComponent, {
      width: '600px',
      height: '550px',
      data: { returnForm: element, returnType: this.returnType }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Edit dialog is closed", result);
      if (result != undefined) {
        this.updateTableAfterEdit(result);
      }
    });
  }

  updateTableAfterEdit(result: any): void {
    this.dataSource = this.dataSource.filter(({formName}) => formName != result.oldFormName);
    if (result.oldReturnType == result.newReturnForm.returnType) {
      this.onNewReturnFormAdded(result.newReturnForm);
    }
  }

  onNewReturnFormAdded(newReturnFormValue: ReturnForm): void {
    this.dataSource.push({
      formName: newReturnFormValue.formName,
      dueDateOfFiling: this.datepipe.transform(new Date(newReturnFormValue.dueDateOfFiling), 'MMM d, y'),
      periodicity: newReturnFormValue.periodicity
    });
    console.log(this.dataSource);
    this.table.renderRows();
  }

  ngOnInit() {
    this.returnType = this.router.snapshot.paramMap.get('type');
    this.apiService.getReturnFormsByReturnType(this.returnType)
    .pipe(map(
      res => {
        return res.map(item => {
          const resDate: Date = new Date(item.dueDateOfFiling);

          return {
            formName: item.formName,
            dueDateOfFiling: this.datepipe.transform(resDate, 'MMM d, y'),
            periodicity: item.periodicity
          };
        });
      }
    )).subscribe(res => {
      console.log(res);
      this.dataSource = res;
    });
  }

}
