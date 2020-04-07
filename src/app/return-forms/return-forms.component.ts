import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddReturnFormDialogComponent } from './add-return-form-dialog/add-return-form-dialog.component';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SyncupApiService } from '../shared/api/syncup-api.service';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { ReturnForm } from '../model/ReturnForm';
import { MatTable } from '@angular/material/table';
import { EditReturnFormDialogComponent } from './edit-return-form-dialog/edit-return-form-dialog.component';
import { SelectionModel } from '@angular/cdk/collections';
import { DeleteReturnFormsDialogComponent } from './delete-return-forms-dialog/delete-return-forms-dialog.component';
import { NavBarService } from '../nav-bar/nav-bar.service';

@Component({
  selector: 'app-return-forms',
  templateUrl: './return-forms.component.html',
  styleUrls: ['./return-forms.component.css']
})
export class ReturnFormsComponent implements OnInit {
  returnType: string;
  displayedColumns: string[] = ['select', 'formName', 'periodicity', 'dueDateOfFiling', 'actions'];
  dataSource: any[] = [];
  @ViewChild(MatTable) table: MatTable<any>;
  selection = new SelectionModel(true, []);
  isButtonDisabled: boolean = true;
  private headings = {
    incomeTax: 'Income Tax',
    tds: 'TDS',
    roc: 'ROC',
    gst: 'GST'
  };

  constructor(private dialog: MatDialog, private router: ActivatedRoute, private apiService: SyncupApiService,
    private datepipe: DatePipe, private navBar: NavBarService) {
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  isAnyCheckBoxSelected(): void {
    this.isButtonDisabled = true;
    this.dataSource.forEach(row => {
      if (this.selection.isSelected(row)) {
        this.isButtonDisabled = false;
      }
    });
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.forEach(row => this.selection.select(row));
    this.isAnyCheckBoxSelected();
  }

  toggleSelection(row: any) {
    this.selection.toggle(row);
    this.isAnyCheckBoxSelected();
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddReturnFormDialogComponent, {
      width: '500px',
      height: '450px',
      data: { returnType: this.returnType }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.selection.clear();
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
      this.selection.clear();
      console.log("Edit dialog is closed", result);
      if (result != undefined) {
        this.updateTableAfterEdit(result);
      }
    });
  }

  openDeleteDialog(): void {
    let rowList = [];
    this.dataSource.forEach(row => {
      if (this.selection.isSelected(row)) {
        rowList.push({ oldFormName: row.formName, dueDateOfFiling: row.dueDateOfFiling, periodicity: row.periodicity });
      }
    });
    console.log(rowList);
    const dialogRef = this.dialog.open(DeleteReturnFormsDialogComponent, {
      width: '550px',
      height: '400px',
      data: { returnFormList: rowList, returnType: this.returnType }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.selection.clear();
      console.log("Delete dialog is closed", result);
      console.log(rowList);
      console.log(rowList.length);
      if (result == rowList.length) {
        this.updateTableAfterDelete(rowList);
      }
    });
  }

  updateTableAfterDelete(formNameList: any): void {
    let temp = [];
    formNameList.forEach(item => {
      temp.push(item.oldFormName);
    })
    console.log(temp);
    this.dataSource = this.dataSource.filter(({ formName }) => temp.indexOf(formName) == -1);
    console.log(this.dataSource);
    this.table.renderRows();
  }

  updateTableAfterEdit(result: any): void {
    this.dataSource = this.dataSource.filter(({ formName }) => formName != result.oldFormName);
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
    this.navBar.show();
    this.router.paramMap.subscribe(
      (params: ParamMap) => {
        this.returnType = params.get('type');
        this.navBar.changeToolBarTitle("Return Forms: " + this.headings[this.returnType]);
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
          }
        );
      }
    );
  }

}
