import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ReturnForm } from '../model/ReturnForm';
import {SyncupApiService} from 'src/app/shared/api/syncup-api.service';
import { DatePipe } from '@angular/common';
import { Constants } from '../shared/global/constants';

@Injectable({
  providedIn: 'root'
})
export class ApplicableReturnFormsService {
  private dataSource = new BehaviorSubject<ReturnForm[]>([]);
  currentDataSource = this.dataSource.asObservable();
  private selectedReturnForms  = new BehaviorSubject<Map<string, string[]>>(new Map<string, string[]>());

  constructor(private apiService: SyncupApiService, private datePipe: DatePipe) { }

  initializeDataSource() {
    this.apiService.getAllReturnForms().subscribe(
      res => {
        console.log(res);
        res.forEach(returnForm => returnForm.setDueDateOfFiling = this.datePipe.transform(returnForm.getDueDateOfFiling, Constants.DUE_DATE_OF_FILING_DISPLAY_FORMAT))
        this.dataSource.next(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  public clearSelectedReturnForms(returnType: string) {
    this.selectedReturnForms.getValue().delete(returnType);
  }

  public getSelectedReturnForms(returnType: string): string[] {
    return this.selectedReturnForms.getValue().get(returnType);
  }

  public getDataSourceByReturnType(returnType: string): ReturnForm[] {
    let temp = this.dataSource.getValue();
    this.clearSelectedReturnForms(returnType);
    return temp.filter( returnForm => returnForm.getReturnType == returnType);
  }

  public addSelectedReturnForm(returnType: string, returnFormName: string) {
    let returnFormsArray = this.getSelectedReturnForms(returnType);
    if (returnFormsArray == undefined) {
      returnFormsArray = [];
    }
    returnFormsArray.push(returnFormName);
    this.selectedReturnForms.getValue().set(returnType, returnFormsArray);
  }

  public removeReturnForm(returnType: string, returnFormName: string) {
    let returnFormsArray = this.getSelectedReturnForms(returnType);
    let index = returnFormsArray.indexOf(returnFormName);
    returnFormsArray.splice(index, 1);
    this.selectedReturnForms.getValue().set(returnType, returnFormsArray);
  }

}
