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
  private selectedReturnForms = new BehaviorSubject<string[]>([]);
  currentSelectedReturnForms = this.selectedReturnForms.asObservable();

  constructor(private apiService: SyncupApiService, private datePipe: DatePipe) { }

  initializeDataSource() {
    this.apiService.getAllReturnForms().subscribe(
      res => {
        console.log(res);
        res.forEach(returnForm => returnForm.dueDateOfFiling = this.datePipe.transform(returnForm.dueDateOfFiling, Constants.DUE_DATE_OF_FILING_DISPLAY_FORMAT))
        this.dataSource.next(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  public clearSelectedReturnForms() {
    this.selectedReturnForms.next([]);
  }

get getSelectedReturnForms(): string[] {
  return this.selectedReturnForms.getValue();
}

  public getDataSourceByReturnType(returnType: string): ReturnForm[] {
    let temp = this.dataSource.getValue();
    this.clearSelectedReturnForms();
    return temp.filter( returnForm => returnForm.returnType == returnType);
  }

  public addSelectedReturnForm(returnFormName: string) {
    this.selectedReturnForms.getValue().push(returnFormName);
    console.log(this.selectedReturnForms.getValue());
  }

  public removeReturnForm(returnFormName: string) {
    let index = this.selectedReturnForms.getValue().indexOf(returnFormName);
    this.selectedReturnForms.getValue().splice(index, 1);
    console.log(this.selectedReturnForms.getValue());
  }

}
