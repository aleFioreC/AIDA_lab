import { Component } from '@angular/core';
import { GeneralService } from 'src/app/service/general.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CardLayout } from 'src/app/model/card_layout';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  cards: CardLayout[] = [];

  constructor(private _sanitizer: DomSanitizer, public dialog: MatDialog, private generalService: GeneralService, private router: Router) { }

  ngOnInit(): void {
    this.findAll()
  }

  remove(card) {
    this.generalService.deletNews(card.id).subscribe(res => {
      this.findAll()
      this.openDialog()
    })
  }

  open(card) {
    this.router.navigate(['/news/' + card.id])
  }

  findAll() {
    this.cards = []
    this.generalService.allNews().subscribe((res: any) => {
      res.forEach(element => {
        element.file = this._sanitizer.bypassSecurityTrustUrl('data:image/png;base64' + element.file)
        let card = new CardLayout(element.idNews, element.title, '2', '1', element.description, element.file)
        this.cards.push(card)
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

}
