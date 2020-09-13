import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  isPrinting = false;

  constructor(private router: Router) { }

  printDocument(documentName: string, documentData: string) {
    this.isPrinting = true;
    this.router.navigate(['/', { outlets: { 'printOutlet': ['print', documentName, documentData] } }]).then((e) => {
      if (e) {
        console.log('Navigation to client report successful');
      } else {
        console.log('Navigation to client report failed', e);
      }
    });
  }

  onDataReady() {
    setTimeout(() => {
      window.print();
      this.isPrinting = false;
      this.router.navigate([{ outlets: { print: null }}]);
    });
  }
}
