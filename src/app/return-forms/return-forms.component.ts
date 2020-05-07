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
import { Constants } from '../shared/global/constants';
import { AddRevisedDueDateDialogComponent } from './add-revised-due-date-dialog/add-revised-due-date-dialog.component';

@Component({
  selector: 'app-return-forms',
  templateUrl: './return-forms.component.html',
  styleUrls: ['./return-forms.component.css']
})
export class ReturnFormsComponent implements OnInit {
  returnType: string;
  displayedColumns: string[] = ['select', 'formName', 'periodicity', 'dueDateOfFiling', 'revisedDueDateOfFiling', 'actions'];
  dataSource: ReturnForm[] = [];
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

  openRevisedDueDateDialog(element: ReturnForm): void {
    const dialogRef = this.dialog.open(AddRevisedDueDateDialogComponent, {
      width: '650px',
      height: '600px',
      data: { form: element }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result != undefined) {
        this.updateTableAfterEdit(element, result);
      }
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddReturnFormDialogComponent, {
      width: '600px',
      height: '500px',
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

  openEditDialog(element: ReturnForm): void {
    const dialogRef = this.dialog.open(EditReturnFormDialogComponent, {
      width: '600px',
      height: '550px',
      data: { returnForm: element, returnType: this.returnType }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.selection.clear();
      console.log("Edit dialog is closed", result);
      if (result != undefined) {
        this.updateTableAfterEdit(element, result);
      }
    });
  }

  openDeleteDialog(): void {
    let rowList = [];
    this.dataSource.forEach(row => {
      if (this.selection.isSelected(row)) {
        rowList.push({ oldFormName: row.getFormName, dueDateOfFiling: row.getDueDateOfFiling, periodicity: row.getPeriodicity });
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
    this.dataSource = this.dataSource.filter(({ getFormName }) => temp.indexOf(getFormName) == -1);
    console.log(this.dataSource);
    this.table.renderRows();
  }

  updateTableAfterEdit(oldForm: ReturnForm, result: ReturnForm): void {
    this.dataSource = this.dataSource.filter(({ getFormName }) => getFormName != oldForm.getFormName);
    if (oldForm.getReturnType == result.getReturnType) {
      this.onNewReturnFormAdded(result);
    }
  }

  onNewReturnFormAdded(newReturnFormValue: ReturnForm): void {
    let form = new ReturnForm();
    form.setFormName = newReturnFormValue.getFormName;
    form.setDueDateOfFiling = newReturnFormValue.getDueDateOfFiling;
    form.setPeriodicity = newReturnFormValue.getPeriodicity;
    form.setDueDateSchedulerSet = newReturnFormValue.getDueDateSchedulerSet;
    form.getDueDateSchedulerSet[0].setDueDateOfFiling = this.datepipe.transform(new Date(newReturnFormValue.getDueDateSchedulerSet[0].getDueDateOfFiling), Constants.REVISED_DUE_DATE_OF_FILING_DISPLAY_FORMAT);
    if (newReturnFormValue.getDueDateSchedulerSet[0].getRevisedDueDateOfFiling != undefined) {
      newReturnFormValue.getDueDateSchedulerSet[0].setRevisedDueDateOfFiling = this.datepipe.transform(new Date(newReturnFormValue.getDueDateSchedulerSet[0].getRevisedDueDateOfFiling), Constants.REVISED_DUE_DATE_OF_FILING_DISPLAY_FORMAT);
    }
    this.dataSource.push(form);
    console.log(this.dataSource);
    this.table.renderRows();
  }

  ngOnInit() {
    this.navBar.show();
    this.router.paramMap.subscribe(
      (params: ParamMap) => {
        this.returnType = params.get('type');
        this.navBar.changeToolBarTitle("Return Forms: " + this.headings[this.returnType]);
        this.apiService.getReturnFormsByReturnType(this.returnType).subscribe(
          res => {
            console.log(res);
            let temp: ReturnForm[] = []
            res.forEach(form => {
              let returnForm = form;
              returnForm.getDueDateSchedulerSet[0].setDueDateOfFiling = new Date(this.datepipe.transform(new Date(returnForm.getDueDateSchedulerSet[0].getDueDateOfFiling), Constants.REVISED_DUE_DATE_OF_FILING_DISPLAY_FORMAT)).toDateString();
              if (returnForm.getDueDateSchedulerSet[0].getRevisedDueDateOfFiling != null) {
                returnForm.getDueDateSchedulerSet[0].setRevisedDueDateOfFiling = new Date(this.datepipe.transform(new Date(returnForm.getDueDateSchedulerSet[0].getRevisedDueDateOfFiling), Constants.REVISED_DUE_DATE_OF_FILING_DISPLAY_FORMAT)).toDateString();
              }
              temp.push(returnForm);
            });
            this.dataSource = temp;
          }
        );
      }
    );
  }

}
