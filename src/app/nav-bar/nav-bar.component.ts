import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { NavBarService } from './nav-bar.service';
import { PrintService } from '../shared/print/print.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  @ViewChild('sidenav') public sidenav: MatSidenav;

  constructor(private navBar: NavBarService, private printService: PrintService) { }

  ngOnInit() {
    this.navBar.setSidenav(this.sidenav);
  }

  toggleSidenav() {
		this.sidenav.toggle();
    console.log('Clicked');
  }

}
