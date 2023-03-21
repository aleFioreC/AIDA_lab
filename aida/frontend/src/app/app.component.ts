import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from './component/basic/modal-dialog/modal-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpClient]
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
  }

  constructor(private translate: TranslateService, public dialog: MatDialog, public router: Router) {
    this.translate.setDefaultLang('en')
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  setLanguage(language: string) {
    this.translate.use(language)
    this.reloadCurrentRoute()
    this.openDialog(language)
  }

  reloadCurrentRoute() {
    this.router.navigateByUrl(this.router.url, { skipLocationChange: true }).then(() => {
      this.router.navigate([this.router.url]);
    });
  }

  openDialog(language: string) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '220px'
    dialogConfig.width = '600px'

    let lang = language == 'it' ? 'Italiano' : 'English'

    dialogConfig.data = {
      title: this.translate.get("operation.success"),
      message: this.translate.get("operation.language") + ": " + lang,
      class: 'success-class'
    };

    this.dialog.open(ModalDialogComponent, dialogConfig);

  }
}
