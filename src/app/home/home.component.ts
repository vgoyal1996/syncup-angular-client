import { Component, OnInit, ViewChild } from '@angular/core';
import { NavBarService } from '../nav-bar/nav-bar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private navBar: NavBarService) {
  }

  ngOnInit() {
    this.navBar.show();
    this.navBar.changeToolBarTitle("Home");
  }

}
