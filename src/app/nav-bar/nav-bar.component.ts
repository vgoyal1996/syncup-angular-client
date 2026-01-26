import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavBarService } from './nav-bar.service';
import { PrintService } from '../shared/print/print.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  standalone: false
})
export class NavBarComponent implements OnInit {
  @ViewChild('sidenav') public sidenav: MatSidenav;

  constructor(public navBar: NavBarService, public printService: PrintService) { }

  ngOnInit() {
    this.navBar.setSidenav(this.sidenav);
  }

  toggleSidenav() {
    this.sidenav.toggle();
    console.log('Clicked');
  }

}
