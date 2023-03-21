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
import { CardDisplay } from 'src/app/model/card_display';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-private-section',
  templateUrl: './private-section.component.html',
  styleUrls: ['./private-section.component.css']
})
export class PrivateSectionComponent implements OnInit {

  state: any
  result: string = '';
  currentLanguage = '';

  constructor(private translate: TranslateService, private _sanitizer: DomSanitizer, private location: Location, public router: Router, public dialog: MatDialog, private generalService: GeneralService) {
    this.currentLanguage = this.translate.currentLang ? this.translate.currentLang : this.translate.defaultLang
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLanguage = event.lang;
    });
  }

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

  news: CardDisplay[] = [];
  research: CardDisplay[] = [];
  people: CardDisplay[] = [];
  thesis: CardDisplay[] = [];

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
    this.generalService.allThesis().subscribe((res: Thesis[]) => {
      res.forEach(element => {
        let languages = element.langs.filter(c => c.language == this.currentLanguage)[0]
        let description = languages.description && languages.description.length > 400 ? languages.description.slice(0, 320) + '...read more...' : languages.description
        let file = element.file != null ? this._sanitizer.bypassSecurityTrustUrl('data:image/png;base64' + element.file) : null
        let card = new CardDisplay(element.idThesis, languages.title, description, file)
        this.thesis.push(card)
      });
    });
  }

  findAllNews() {
    this.news = []
    this.generalService.allNews().subscribe((res: News[]) => {
      res.forEach(element => {
        let languages = element.langs.filter(c => c.language == this.currentLanguage)[0]
        let description = languages.description && languages.description.length > 400 ? languages.description.slice(0, 320) + '...read more...' : languages.description
        let file = element.file != null ? this._sanitizer.bypassSecurityTrustUrl('data:image/png;base64' + element.file) : null
        let card = new CardDisplay(element.idNews, languages.title, description, file)
        this.news.push(card)
      });
    });
  }

  findAllResearch() {
    this.research = []
    this.generalService.allResearch().subscribe((res: Research[]) => {
      res.forEach(element => {
        let languages = element.langs.filter(c => c.language == this.currentLanguage)[0]
        let description = languages.description && languages.description.length > 400 ? languages.description.slice(0, 320) + '...read more...' : languages.description
        let file = element.files.length && element.files[0] != null ? this._sanitizer.bypassSecurityTrustUrl('data:image/png;base64' + element.files[0].file) : null
        let card = new CardDisplay(element.idResearch, languages.title, description, file)
        this.research.push(card)
      });
    });
  }

  newPeople() {
    this.router.navigate(['/insert-people'], { state: { user: this.state } });
  }

  newNews() {
    this.router.navigate(['/insert-news'], { state: { user: this.state } });
  }

  newThesis() {
    this.router.navigate(['/insert-thesis'], { state: { user: this.state } });
  }

  newResearch() {
    this.router.navigate(['/insert-research'], { state: { user: this.state } });
  }

  openNews(card) {
    this.router.navigate(['/edit-news/' + card.id], { state: { user: this.state } })
  }

  removeNews(card) {
    this.generalService.deleteNews(card.id).subscribe(res => {
      this.openDialog()
      this.findAllNews()
    })
  }

  openResearch(card) {
    this.router.navigate(['/edit-research/' + card.id], { state: { user: this.state } })
  }

  removeResearch(card) {
    this.generalService.deleteResearch(card.id).subscribe(res => {
      this.openDialog()
      this.findAllResearch()
    })
  }

  openPeople(card) {
    this.router.navigate(['/edit-people/' + card.id], { state: { user: this.state } })
  }

  removePeople(card) {
    this.generalService.deletePeople(card.id).subscribe(res => {
      this.openDialog()
      this.findAllPeople()
    })
  }

  openThesis(card) {
    this.router.navigate(['/edit-thesis/' + card.id], { state: { user: this.state } })
  }

  removeThesis(card) {
    this.generalService.deleteThesis(card.id).subscribe(res => {
      this.openDialog()
      this.findAllThesis()
    })
  }

  confirmDialog(card, selection): void {

    const message = `Sei sicuro di voler rimuovere l'elemento?`;

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '220px'
    dialogConfig.width = '600px'
    dialogConfig.panelClass = 'full-screen-modal'

    dialogConfig.data = {
      title: 'Warning',
      message: message,
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if (this.result && selection == 'thesis') {
        this.removeThesis(card)
      }
      else if (this.result && selection == 'news') {
        this.removeNews(card)
      }
      else if (this.result && selection == 'research') {
        this.removeResearch(card)
      } else if (this.result && selection == 'people') {
        this.removePeople(card)
      }
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
      message: 'Elemento rimosso con successo.',
      class: 'success-class'
    };

    this.dialog.open(ModalDialogComponent, dialogConfig);

  }

}
