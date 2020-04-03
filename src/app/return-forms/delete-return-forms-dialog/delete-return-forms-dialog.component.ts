import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SyncupApiService } from '../../shared/api/syncup-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-delete-return-forms-dialog',
  templateUrl: './delete-return-forms-dialog.component.html',
  styleUrls: ['./delete-return-forms-dialog.component.css']
})
export class DeleteReturnFormsDialogComponent implements OnInit {

  private rowList: any;
  private returnType: string;

  constructor(private dialogRef: MatDialogRef<DeleteReturnFormsDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: any,
  private apiService: SyncupApiService, private snackBar: MatSnackBar) { 
    this.rowList = data.returnFormList;
    this.returnType = data.returnType;
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteReturnForms(): void {
    let formNameList = this.rowList.map(item => {return item.oldFormName});
    this.apiService.deleteReturnFormsByFormNames(this.returnType, formNameList).subscribe(
      res => {
        if (res == this.rowList.length) {
          console.log(res + " forms deleted");
          this.snackBar.open(res + " forms deleted", null, {
            duration: 3000,
          });
        } else {
          console.log(res + " forms deleted");
          this.snackBar.open("OOPS!! something went wrong. " + res + " forms deleted. Please", null, {
            duration: 3000,
          });
        }
        this.dialogRef.close(res);
      },
      err => {
        console.log(err);
        this.snackBar.open("OOPS!! something went wrong.", null, {
          duration: 3000,
        });
        this.dialogRef.close();
      }
    );
  }

}
