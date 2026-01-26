import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {
  private sidenav: MatSidenav;
  private toolBarTitle = new BehaviorSubject<string>("");
  private visible = new BehaviorSubject<boolean>(false);
  currentToolBarTitle = this.toolBarTitle.asObservable();
  currentVisibility = this.visible.asObservable();

  constructor() {
  }

  hide() { this.visible.next(false); }

  show() { this.visible.next(true); }

  toggleVisibility() { this.visible.next(!this.visible.getValue()); }

  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  get getVisible(): boolean {
    return this.visible.getValue();
  }

  get getToolBarTitle(): string {
    return this.toolBarTitle.getValue();
  }

  public open() {
    return this.sidenav.open();
  }

  changeToolBarTitle(title: string) {
    this.toolBarTitle.next(title);
  }


  public close() {
    return this.sidenav.close();
  }

  public toggle(): void {
    this.sidenav.toggle();
  }
}
