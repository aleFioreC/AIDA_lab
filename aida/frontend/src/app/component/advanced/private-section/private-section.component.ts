import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalDialogComponent } from '../../basic/modal-dialog/modal-dialog.component';
import { GeneralService } from 'src/app/service/general.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CardLayout } from 'src/app/model/card_layout';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-private-section',
  templateUrl: './private-section.component.html',
  styleUrls: ['./private-section.component.css']
})
export class PrivateSectionComponent implements OnInit {

  state: any

  constructor(private _sanitizer: DomSanitizer, private location: Location, public router: Router, public dialog: MatDialog, private generalService: GeneralService) { }

  ngOnInit(): void {
    this.state = this.location.getState();
    if (!this.state.user) {
      this.router.navigate(['/']);
    }
    this.findAll()
  }

  news: CardLayout[] = [];

  findAll() {
    this.news = []
    this.generalService.allNews().subscribe((res: any) => {
      res.forEach(element => {
        element.description = element.description && element.description.length > 400 ? element.description.slice(0, 320) + '...read more...' : element.description
        element.file = element.file != null ? this._sanitizer.bypassSecurityTrustUrl('data:image/png;base64' + element.file) : null
        let card = new CardLayout(element.idNews, element.title, '2', '1', element.description, element.file, element.creationDate)
        this.news.push(card)
      });
    });
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      title: 'Operazione completata',
      message: 'La risorsa è stata eliminata.'
    };

    this.dialog.open(ModalDialogComponent, dialogConfig);

  }

  new() {
    this.router.navigate(['/insert'], { state: { user: this.state } });
  }

  open(card) {
    this.router.navigate(['/edit/' + card.id], { state: { user: this.state } })
  }

  remove(card) {
    this.generalService.deletNews(card.id).subscribe(res => {
      this.openDialog()
    })
  }

}
