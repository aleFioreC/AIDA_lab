import { Component, ViewChild, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isShow: boolean = false;
  selected = 'en';

  @Output() language: EventEmitter<any> = new EventEmitter();

  constructor(private observer: BreakpointObserver, private cdRef: ChangeDetectorRef) { }

  ngOnInit(
  ) {
  }

  setLanguage(language: string) {
    this.selected = language
    this.language.emit(this.selected)
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 1200px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
        this.isShow = false;
      } else {
        this.isShow = true
      }
    });
  }
}
