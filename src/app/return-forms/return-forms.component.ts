import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddReturnFormDialogComponent } from './add-return-form-dialog/add-return-form-dialog.component';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SyncupApiService } from '../shared/api/syncup-api.service';
import { DatePipe } from '@angular/common';
import { ReturnForm } from '../model/ReturnForm';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { EditReturnFormDialogComponent } from './edit-return-form-dialog/edit-return-form-dialog.component';
import { SelectionModel } from '@angular/cdk/collections';
import { DeleteReturnFormsDialogComponent } from './delete-return-forms-dialog/delete-return-forms-dialog.component';
import { NavBarService } from '../nav-bar/nav-bar.service';
import { Constants } from '../shared/global/constants';
import { AddRevisedDueDateDialogComponent } from './add-revised-due-date-dialog/add-revised-due-date-dialog.component';

@Component({
  selector: 'app-return-forms',
  templateUrl: './return-forms.component.html',
  styleUrls: ['./return-forms.component.css'],
  standalone: false
})
export class ReturnFormsComponent implements OnInit {
  returnType: string;
  displayedColumns: string[] = ['select', 'formName', 'periodicity', 'dueDateOfFiling', 'revisedDueDateOfFiling', 'actions'];
  dataSource: MatTableDataSource<ReturnForm> = new MatTableDataSource([]);
  @ViewChild(MatTable) table: MatTable<any>;
  selection = new SelectionModel(true, []);
  isButtonDisabled: boolean = true;
  upcomingCount = 0;
  overdueCount = 0;

  public headings: { [key: string]: string } = {
    incomeTax: 'Income Tax',
    tds: 'TDS',
    roc: 'ROC',
    gst: 'GST'
  };

  constructor(private dialog: MatDialog, private router: ActivatedRoute, private apiService: SyncupApiService,
    private datepipe: DatePipe, private navBar: NavBarService) {
  }

  // --- Dashboard Logic ---

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  calculateStats(forms: ReturnForm[]) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    this.upcomingCount = 0;
    this.overdueCount = 0;

    forms.forEach(form => {
      if (form.getDueDateSchedulerSet && form.getDueDateSchedulerSet.length > 0) {
        const dateStr = form.getDueDateSchedulerSet[0].getDueDateOfFiling;
        const dueDate = new Date(dateStr);

        if (!isNaN(dueDate.getTime())) {
          if (dueDate < today) {
            this.overdueCount++;
          } else if (dueDate <= nextWeek) {
            this.upcomingCount++;
          }
        }
      }
    });
  }

  getDateClass(dateString: string): string {
    if (!dateString) return '';

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const sevenDays = new Date();
    sevenDays.setDate(today.getDate() + 7);

    const dueDate = new Date(dateString);

    if (isNaN(dueDate.getTime())) return '';

    if (dueDate < today) {
      return 'urgent'; // Matched with .status-chip.urgent
    } else if (dueDate <= sevenDays) {
      return 'upcoming'; // Matched with .status-chip.upcoming
    } else {
      return 'safe'; // Matched with .status-chip.safe
    }
  }

  // -----------------------

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    if (!this.dataSource || !this.dataSource.data) return false;
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  isAnyCheckBoxSelected(): void {
    this.isButtonDisabled = true;
    if (this.dataSource.data) {
      this.dataSource.data.forEach(row => {
        if (this.selection.isSelected(row)) {
          this.isButtonDisabled = false;
        }
      });
    }
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
    this.isAnyCheckBoxSelected();
  }

  toggleSelection(row: any) {
    this.selection.toggle(row);
    this.isAnyCheckBoxSelected();
  }

  openRevisedDueDateDialog(element: ReturnForm): void {
    const dialogRef = this.dialog.open(AddRevisedDueDateDialogComponent, {
      width: '550px',
      height: 'auto',
      maxHeight: '90vh',
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
      width: '650px',
      height: '650px',
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
    this.dataSource.data.forEach(row => {
      if (this.selection.isSelected(row)) {
        rowList.push({ oldFormName: row.getFormName, dueDateOfFiling: row.getDueDateSchedulerSet[0].getDueDateOfFiling, periodicity: row.getPeriodicity });
      }
    });
    console.log(rowList);
    const dialogRef = this.dialog.open(DeleteReturnFormsDialogComponent, {
      width: '550px',
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
    // Filter out deleted items
    const newData = this.dataSource.data.filter(({ getFormName }) => temp.indexOf(getFormName) == -1);
    this.dataSource.data = newData;
    this.calculateStats(newData);
    this.table.renderRows();
  }

  updateTableAfterEdit(oldForm: ReturnForm, result: ReturnForm): void {
    // Remove old
    let newData = this.dataSource.data.filter(({ getFormName }) => getFormName != oldForm.getFormName);
    this.dataSource.data = newData;

    // Add new if return type matches
    if (oldForm.getReturnType == result.getReturnType) {
      this.onNewReturnFormAdded(result);
    } else {
      // Just re-calc stats if we removed something
      this.calculateStats(this.dataSource.data);
      this.table.renderRows();
    }
  }

  onNewReturnFormAdded(newReturnFormValue: ReturnForm): void {
    let form = new ReturnForm();
    form.setFormId = newReturnFormValue.getFormId;
    form.setFormName = newReturnFormValue.getFormName;
    form.setPeriodicity = newReturnFormValue.getPeriodicity;
    form.setReturnType = newReturnFormValue.getReturnType;

    // Copy all occurrence fields for edit functionality
    form.setMonthlyDayOccurrence = newReturnFormValue.getMonthlyDayOccurrence;
    form.setYearlyDayOccurrence = newReturnFormValue.getYearlyDayOccurrence;
    form.setYearlyMonthOccurrence = newReturnFormValue.getYearlyMonthOccurrence;
    form.setFirstQuarterDayOccurrence = newReturnFormValue.getFirstQuarterDayOccurrence;
    form.setFirstQuarterMonthOccurrence = newReturnFormValue.getFirstQuarterMonthOccurrence;
    form.setSecondQuarterDayOccurrence = newReturnFormValue.getSecondQuarterDayOccurrence;
    form.setSecondQuarterMonthOccurrence = newReturnFormValue.getSecondQuarterMonthOccurrence;
    form.setThirdQuarterDayOccurrence = newReturnFormValue.getThirdQuarterDayOccurrence;
    form.setThirdQuarterMonthOccurrence = newReturnFormValue.getThirdQuarterMonthOccurrence;
    form.setFourthQuarterDayOccurrence = newReturnFormValue.getFourthQuarterDayOccurrence;
    form.setFourthQuarterMonthOccurrence = newReturnFormValue.getFourthQuarterMonthOccurrence;

    form.setDueDateSchedulerSet = newReturnFormValue.getDueDateSchedulerSet;
    if (newReturnFormValue.getDueDateSchedulerSet && newReturnFormValue.getDueDateSchedulerSet.length > 0) {
      form.getDueDateSchedulerSet[0].setDueDateOfFiling = this.datepipe.transform(new Date(newReturnFormValue.getDueDateSchedulerSet[0].getDueDateOfFiling), Constants.REVISED_DUE_DATE_OF_FILING_DISPLAY_FORMAT);
      if (newReturnFormValue.getDueDateSchedulerSet[0].getRevisedDueDateOfFiling != undefined) {
        newReturnFormValue.getDueDateSchedulerSet[0].setRevisedDueDateOfFiling = this.datepipe.transform(new Date(newReturnFormValue.getDueDateSchedulerSet[0].getRevisedDueDateOfFiling), Constants.REVISED_DUE_DATE_OF_FILING_DISPLAY_FORMAT);
      }
    }

    const currentData = this.dataSource.data;
    currentData.push(form);
    this.dataSource.data = currentData;
    this.calculateStats(this.dataSource.data);
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
              if (returnForm.getDueDateSchedulerSet && returnForm.getDueDateSchedulerSet.length > 0) {
                returnForm.getDueDateSchedulerSet[0].setDueDateOfFiling = new Date(this.datepipe.transform(new Date(returnForm.getDueDateSchedulerSet[0].getDueDateOfFiling), Constants.REVISED_DUE_DATE_OF_FILING_DISPLAY_FORMAT)).toDateString();
                if (returnForm.getDueDateSchedulerSet[0].getRevisedDueDateOfFiling != null) {
                  returnForm.getDueDateSchedulerSet[0].setRevisedDueDateOfFiling = new Date(this.datepipe.transform(new Date(returnForm.getDueDateSchedulerSet[0].getRevisedDueDateOfFiling), Constants.REVISED_DUE_DATE_OF_FILING_DISPLAY_FORMAT)).toDateString();
                }
              }
              temp.push(returnForm);
            });
            // Initialize MatTableDataSource
            this.dataSource = new MatTableDataSource(temp);

            // Custom filtering to search by name or periodicity
            this.dataSource.filterPredicate = (data: ReturnForm, filter: string) => {
              const dataStr = (data.getFormName + data.getPeriodicity).toLowerCase();
              return dataStr.indexOf(filter) != -1;
            };

            this.calculateStats(temp);
          }
        );
      }
    );
  }

}
