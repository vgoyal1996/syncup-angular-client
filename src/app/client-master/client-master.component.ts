import { Component, OnInit, ViewChild } from '@angular/core';
import { NavBarService } from '../nav-bar/nav-bar.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SyncupApiService } from '../shared/api/syncup-api.service';
import { Client } from '../model/Client';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router, NavigationExtras } from '@angular/router';
import { DeleteClientsDialogComponent } from './delete-clients-dialog/delete-clients-dialog.component';
import { DataTransferService } from '../shared/data/data-transfer.service';
import { Constants } from '../shared/global/constants';
import { AssessmentYearDialogComponent } from './assessment-year-dialog/assessment-year-dialog.component';

@Component({
  selector: 'app-client-master',
  templateUrl: './client-master.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  styleUrls: ['./client-master.component.css'],
  standalone: false
})
export class ClientMasterComponent implements OnInit {
  displayedColumns: string[] = ['select', 'clientCode', 'clientName', 'fatherName', 'panNo', 'clientType', 'doiOrDob', 'mobile', 'actions'];
  childDisplayedColumns: string[] = ['headings', 'values'];
  private childColumnsMap: Map<string, any> = new Map();
  childDataSource: any;
  dataSource = new MatTableDataSource([]);
  expandedElement: Client | null;
  selection = new SelectionModel(true, []);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isLoading = true;
  isButtonDisabled: boolean = true;
  @ViewChild(MatTable) table: MatTable<any>;
  private stateList = Constants.STATES_AND_UT_LIST;


  constructor(private navBar: NavBarService, private apiService: SyncupApiService, private router: Router,
    private dialog: MatDialog, private dataTransferService: DataTransferService) {
  }

  changeChildDataSource(element: any) {
    this.childDataSource = this.childColumnsMap.get(element.clientCode);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.navBar.show();
    this.navBar.changeToolBarTitle("Client Master");
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'clientCode': {
          return item.clientCode.toLowerCase();
        }
        case 'clientName': {
          return item.name.toLowerCase();
        }
        default: {
          return item[property];
        }
      }
    };
    this.dataSource.paginator = this.paginator;
    this.apiService.getAllClients().subscribe(
      res => {
        console.log(res);
        res.forEach(element => {
          let childData = [];
          let temp = {};
          temp['heading'] = 'Flat No',
            temp['value'] = element.getFlatNo;
          childData.push(temp);
          temp = {};
          temp['heading'] = 'Area',
            temp['value'] = element.getArea;
          childData.push(temp);
          temp = {};
          temp['heading'] = 'City',
            temp['value'] = element.getCity;
          childData.push(temp);
          temp = {};
          temp['heading'] = 'State',
            temp['value'] = this.stateList[this.stateList.findIndex(obj => obj.value == element.getState)].display;
          childData.push(temp);
          temp = {};
          temp['heading'] = 'PIN Code',
            temp['value'] = element.getPin;
          childData.push(temp);
          temp = {};
          temp['heading'] = 'Client Email ID',
            temp['value'] = element.getClientEmail;
          childData.push(temp);
          temp = {};
          if (element.getResponsiblePersonName != null && element.getResponsiblePersonName != "") {
            temp['heading'] = 'Responsible Person Name',
              temp['value'] = element.getResponsiblePersonName;
            childData.push(temp);
            temp = {};
          }
          if (element.getResponsiblePersonPAN != null && element.getResponsiblePersonPAN != "") {
            temp['heading'] = 'Responsible Person PAN Card No',
              temp['value'] = element.getResponsiblePersonPAN;
            childData.push(temp);
            temp = {};
          }
          if (element.getResponsiblePersonDOB != null && element.getResponsiblePersonDOB != "") {
            temp['heading'] = 'Responsible Person DOB',
              temp['value'] = element.getResponsiblePersonDOB;
            childData.push(temp);
            temp = {};
          }
          if (element.getResponsiblePersonAadhaar != null && element.getResponsiblePersonAadhaar != "") {
            temp['heading'] = 'Responsible Person Aadhaar No',
              temp['value'] = element.getResponsiblePersonAadhaar;
            childData.push(temp);
            temp = {};
          }
          if (element.getCin != null && element.getCin != "") {
            temp['heading'] = 'CIN No',
              temp['value'] = element.getCin;
            childData.push(temp);
          }
          this.childColumnsMap.set(element.getClientCode, childData);
        });
        this.isLoading = false;
        this.dataSource.data = res;
        this.dataSource.sort = this.sort;
        console.log(this.childColumnsMap);
      },
      err => {
        this.isLoading = false;
        console.log(err);
      }
    );
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  addNewClient() {
    this.router.navigateByUrl("/addclient").then((e) => {
      if (e) {
        console.log('Navigation to return Credentials successful');
      } else {
        console.log('Navigation to return Credentials failed');
      }
    });
  }

  openAssessmentYearDialog(element: Client) {
    const dialogRef = this.dialog.open(AssessmentYearDialogComponent, {
      width: '550px',
      height: '300px',
      data: { selectedClient: element }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("closed assessment year dialog" + result);
    });
  }

  openDeleteDialog() {
    let rowList = [];
    this.dataSource.data.forEach(row => {
      if (this.selection.isSelected(row)) {
        rowList.push(row.clientCode);
      }
    });
    console.log(rowList);
    const dialogRef = this.dialog.open(DeleteClientsDialogComponent, {
      width: '550px',
      height: '400px',
      data: { clientList: rowList }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("Delete dialog is closed", result);
      if (result == rowList.length) {
        this.updateDataSourceAfterDelete(rowList);
      }
    })
  }

  updateDataSourceAfterDelete(rowList: any) {
    this.dataSource.data = this.dataSource.data.filter(({ clientCode }) => rowList.indexOf(clientCode) == -1);
    console.log(this.dataSource);
    this.table.renderRows();
    this.selection.clear();
  }

  isAnyCheckBoxSelected(): void {
    this.isButtonDisabled = true;
    this.dataSource.data.forEach(row => {
      if (this.selection.isSelected(row)) {
        this.isButtonDisabled = false;
      }
    });
  }

  openEditPage(element: Client) {
    console.log(element);
    this.dataTransferService.updateClientObject(element);
    this.router.navigateByUrl("/edit-client");
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

}
