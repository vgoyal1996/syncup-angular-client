import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SyncupApiService } from 'src/app/shared/api/syncup-api.service';

@Component({
  selector: 'app-delete-clients-dialog',
  templateUrl: './delete-clients-dialog.component.html',
  styleUrls: ['./delete-clients-dialog.component.css'],
  standalone: false
})
export class DeleteClientsDialogComponent implements OnInit {

  clientList: any;

  constructor(private dialogRef: MatDialogRef<DeleteClientsDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: any,
    private apiService: SyncupApiService, private snackBar: MatSnackBar) {
    this.clientList = data.clientList;
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteClients() {
    this.apiService.deleteClientsByClientCodes(this.clientList).subscribe(
      res => {
        if (res == this.clientList.length) {
          console.log(res + " clients deleted");
          this.snackBar.open(res + " clients deleted", null, {
            duration: 3000,
          });
        } else {
          console.log(res + " clients deleted");
          this.snackBar.open("OOPS!! something went wrong. " + res + " clients deleted. Please refresh.", null, {
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
    )
  }

}
