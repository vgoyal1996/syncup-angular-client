import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SyncupApiService } from '../../shared/api/syncup-api.service';
import { NotificationService } from '../../shared/notification/notification.service';



@Component({
  selector: 'app-delete-return-forms-dialog',
  templateUrl: './delete-return-forms-dialog.component.html',
  styleUrls: ['./delete-return-forms-dialog.component.css'],
  standalone: false
})
export class DeleteReturnFormsDialogComponent implements OnInit {

  rowList: any;
  returnType: string;

  constructor(private dialogRef: MatDialogRef<DeleteReturnFormsDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: any,
    private apiService: SyncupApiService, private notificationService: NotificationService) {
    this.rowList = data.returnFormList;
    this.returnType = data.returnType;
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteReturnForms(): void {
    let formNameList = this.rowList.map(item => { return item.oldFormName });
    this.apiService.deleteReturnFormsByFormNames(this.returnType, formNameList).subscribe(
      res => {
        if (res == this.rowList.length) {
          console.log(res + " forms deleted");
          this.notificationService.showSuccess(res + " forms deleted");
        } else {
          console.log(res + " forms deleted");
          this.notificationService.showError("OOPS!! something went wrong. " + res + " forms deleted. Please refresh.");
        }
        this.dialogRef.close(res);
      },
      err => {
        console.log(err);
        this.notificationService.showError("OOPS!! something went wrong.");
        this.dialogRef.close();
      }
    );
  }

}
