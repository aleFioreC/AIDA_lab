import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalDialogComponent } from '../../basic/modal-dialog/modal-dialog.component';
import { GeneralService } from 'src/app/service/general.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CardLayout } from 'src/app/model/card_layout';
import { DomSanitizer } from '@angular/platform-browser';
import { Research } from 'src/app/model/research';
import { People } from 'src/app/model/people';

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
    this.findAllPeople()
    this.findAllNews()
    this.findAllResearch()
  }

  news: CardLayout[] = [];
  research: Research[] = [];
  people: People[] = [];

  findAllPeople() {
    this.people = []
    this.generalService.allPeople().subscribe((res: any) => {
      res.forEach(element => {
        element.file = this._sanitizer.bypassSecurityTrustUrl('data:image/png;base64' + element.file)
        this.people.push(element)
      });
    });
  }

  findAllNews() {
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

  findAllResearch() {
    this.research = []
    this.generalService.allResearch().subscribe((res: any) => {
      res.forEach(element => {
        element.description = element.description && element.description.length > 400 ? element.description.slice(0, 320) + '...read more...' : element.description
        element.file = this._sanitizer.bypassSecurityTrustUrl('data:image/png;base64' + element.file)
        this.research.push(element)
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

  openNews(card) {
    this.router.navigate(['/edit-news/' + card.id], { state: { user: this.state } })
  }

  removeNews(card) {
    this.generalService.deleteNews(card.id).subscribe(res => {
      this.openDialog()
    })
  }

  openResearch(card) {
    this.router.navigate(['/edit-research/' + card.id], { state: { user: this.state } })
  }

  removeResearch(card) {
    this.generalService.deleteResearch(card.id).subscribe(res => {
      this.openDialog()
    })
  }

  openPeople(card) {
    this.router.navigate(['/edit-people/' + card.id], { state: { user: this.state } })
  }

  deletePeople(card) {
    this.generalService.deletePeople(card.id).subscribe(res => {
      this.openDialog()
    })
  }


}
