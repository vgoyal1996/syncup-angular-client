import { Component, OnInit } from '@angular/core';
import { NavBarService } from '../nav-bar/nav-bar.service';
import { DataTransferService } from '../shared/data/data-transfer.service';
import { Client } from '../model/Client';
import { SyncupApiService } from '../shared/api/syncup-api.service';
import { Observable, forkJoin } from 'rxjs';
import { publishLast, refCount, first } from 'rxjs/operators';
import { ReturnCredentials } from '../model/ReturnCredentials';
import { ClientReturnForms } from '../model/ClientReturnForms';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

export class Tile {
  text: string;
  cols: number;
  rows: number;
  color: string;

  constructor(text: string) {
    this.text = text;
    this.cols = 1;
    this.rows = 1;
    this.color = "3px double #7b1fa2";
  }
}

@Component({
  selector: 'app-selected-client-master',
  templateUrl: './selected-client-master.component.html',
  styleUrls: ['./selected-client-master.component.css']
})
export class SelectedClientMasterComponent implements OnInit {
  private assessmentYear: string;
  private selectedClient: Client;
  private returnCredsArray: ReturnCredentials[];
  private clientReturnFormsArray: ClientReturnForms[];
  headerTiles: Tile[] = [];
  footerTiles: Tile[] = [];
  private selected = new FormControl(0);
  private isReturnCredsArrayNotEmpty = true;
  private headings = [
    {
      value: "incomeTax",
      display: "Income Tax"
    },
    {
      value: "tds",
      display: "TDS"
    },
    {
      value: "roc",
      display: "ROC"
    },
    {
      value: "gst",
      display: "GST"
    }
  ]

  constructor(private navBar: NavBarService, private dataTransferService: DataTransferService, 
    private apiService: SyncupApiService, private router: Router) { }

  ngOnInit() {
    this.navBar.show();
    forkJoin([this.dataTransferService.currentAssessmentYear.pipe(first()), this.dataTransferService.currentSelectedClient.pipe(first())]).subscribe(
      results => {
        console.log(results[0]);
        console.log(results[1]);
        this.assessmentYear = results[0];
        this.selectedClient = results[1];
        this.navBar.changeToolBarTitle(this.selectedClient.getName);
        this.populateGridList();
        this.apiService.getReturnCredentialsByClientId(this.assessmentYear, this.selectedClient.getId).subscribe(
          results2 => {
            console.log(results2);
            this.returnCredsArray = results2;
            if (this.returnCredsArray == undefined || this.returnCredsArray.length == 0) {
              this.isReturnCredsArrayNotEmpty = false;
            }
            
          }
        );
      }
    );
  }
  
  public navigateToReturnCredentials() {
    this.dataTransferService.changeMessage(this.selectedClient.getId.toString());
    this.dataTransferService.updateClient(this.selectedClient.getClientType);
    this.dataTransferService.updateClientObject(this.selectedClient);
    this.dataTransferService.updateAssessmentYear(this.assessmentYear);
    this.router.navigateByUrl('/returnCredentials').then((e) => {
      if (e) {
        console.log('Navigation to return Credentials successful');
      } else {
        console.log('Navigation to return Credentials failed');
      }
    });
  }

  public editReturnCredentials() {
    this.dataTransferService.updateEditReturnCredentialsFlag(true);
    this.dataTransferService.updateReturnCredentialsArrayForEdit(this.returnCredsArray);
    this.navigateToReturnCredentials();
  }

  public addReturnCredentials() {
    this.dataTransferService.updateEditReturnCredentialsFlag(false);
    this.navigateToReturnCredentials();
  }

  populateGridList() {
    this.headerTiles.push(new Tile("Assessment Year: " + this.assessmentYear));
    this.headerTiles.push(new Tile("Client Code: " + this.selectedClient.getClientCode));
    this.headerTiles.push(new Tile("PAN No: " + this.selectedClient.getPan));
    this.headerTiles.push(new Tile("Client Type: "+ this.selectedClient.getClientType));
    
    this.footerTiles.push(new Tile("Father's Name: " + this.selectedClient.getFatherName));
    this.footerTiles.push(new Tile("DOB/DOI: " + this.selectedClient.getDoiOrDob));
    this.footerTiles.push(new Tile("Mobile No: " + this.selectedClient.getMobile));
    this.footerTiles.push(new Tile("Email Id: " + this.selectedClient.getClientEmail));

  }

}
