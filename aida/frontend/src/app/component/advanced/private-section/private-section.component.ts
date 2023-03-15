import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalDialogComponent } from '../../basic/modal-dialog/modal-dialog.component';
import { GeneralService } from 'src/app/service/general.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { Research } from 'src/app/model/research';
import { People } from 'src/app/model/people';
import { News } from 'src/app/model/news';
import { Thesis } from 'src/app/model/thesis';
import { ConfirmDialogComponent } from '../../basic/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-private-section',
  templateUrl: './private-section.component.html',
  styleUrls: ['./private-section.component.css']
})
export class PrivateSectionComponent implements OnInit {

  state: any
  result: string = '';

  constructor(private _sanitizer: DomSanitizer, private location: Location, public router: Router, public dialog: MatDialog, private generalService: GeneralService) { }

  ngOnInit(): void {
    this.state = this.location.getState();
    if (!this.state.user) {
      this.router.navigate(['/']);
    }
    this.findAllPeople()
    this.findAllNews()
    this.findAllThesis()
    this.findAllResearch()
  }

  news: News[] = [];
  research: Research[] = [];
  people: People[] = [];
  thesis: Thesis[] = [];

  findAllPeople() {
    this.people = []
    this.generalService.allPeople().subscribe((res: any) => {
      res.forEach(element => {
        element.file = this._sanitizer.bypassSecurityTrustUrl('data:image/png;base64' + element.file)
        this.people.push(element)
      });
    });
  }

  findAllThesis() {
    this.thesis = []
    this.generalService.allThesis().subscribe((res: any) => {
      res.forEach(element => {
        element.file = this._sanitizer.bypassSecurityTrustUrl('data:image/png;base64' + element.file)
        this.thesis.push(element)
      });
    });
  }

  findAllNews() {
    this.news = []
    this.generalService.allNews().subscribe((res: any) => {
      res.forEach(element => {
        element.description = element.description && element.description.length > 400 ? element.description.slice(0, 320) + '...read more...' : element.description
        element.file = element.file != null ? this._sanitizer.bypassSecurityTrustUrl('data:image/png;base64' + element.file) : null
        this.news.push(element)
      });
    });
  }

  findAllResearch() {
    this.research = []
    this.generalService.allResearch().subscribe((res: any) => {
      res.forEach(element => {
        element.description = element.description && element.description.length > 400 ? element.description.slice(0, 320) + '...read more...' : element.description
        element.file = this._sanitizer.bypassSecurityTrustUrl('data:image/png;base64' + element.files[0].file)
        this.research.push(element)
      });
    });
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '220px'
    dialogConfig.width = '600px'
    dialogConfig.panelClass = 'full-screen-modal'

    dialogConfig.data = {
      title: 'Operazione completata',
      message: 'La risorsa è stata eliminata.',
      class: 'success-class'
    };

    this.dialog.open(ModalDialogComponent, dialogConfig);

  }

  new() {
    this.router.navigate(['/insert'], { state: { user: this.state } });
  }

  openNews(card) {
    this.router.navigate(['/edit-news/' + card.idNews], { state: { user: this.state } })
  }

  removeNews(card) {
    this.generalService.deleteNews(card.idNews).subscribe(res => {
      this.openDialog()
      this.findAllNews()
    })
  }

  openResearch(card) {
    this.router.navigate(['/edit-research/' + card.idResearch], { state: { user: this.state } })
  }

  removeResearch(card) {
    this.generalService.deleteResearch(card.idResearch).subscribe(res => {
      this.openDialog()
      this.findAllResearch()
    })
  }

  openPeople(card) {
    this.router.navigate(['/edit-people/' + card.idPeople], { state: { user: this.state } })
  }

  deletePeople(card) {
    this.generalService.deletePeople(card.idPeople).subscribe(res => {
      this.openDialog()
      this.findAllPeople()
    })
  }

  openThesis(card) {
    this.router.navigate(['/edit-thesis/' + card.idThesis], { state: { user: this.state } })
  }

  deleteThesis(card) {
    this.generalService.deleteThesis(card.idThesis).subscribe(res => {
      this.openDialog()
      this.findAllPeople()
    })
  }

  confirmDialog(): void {

    const message = `Are you sure you want to do this?`;

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '220px'
    dialogConfig.width = '600px'
    dialogConfig.panelClass = 'full-screen-modal'

    dialogConfig.data = {
      title: 'Operazione completata',
      message: 'La risorsa è stata eliminata.',
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
    });
  }

}
