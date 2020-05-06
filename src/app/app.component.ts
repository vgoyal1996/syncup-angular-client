import { Component, OnInit } from '@angular/core';
import { create } from 'rxjs-spy';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'syncup-angular-client';

  constructor() {

  }
  ngOnInit(): void {
    const spy = create();
    spy.show();
  }
}