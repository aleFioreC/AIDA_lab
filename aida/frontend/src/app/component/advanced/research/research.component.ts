import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GeneralService } from 'src/app/service/general.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Research } from 'src/app/model/research';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { CardDisplay } from 'src/app/model/card_display';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})
export class ResearchComponent implements OnInit {

  cards: CardDisplay[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;
  obs: Observable<any>;
  card: CardDisplay;
  currentLanguage = '';

  constructor(private translate: TranslateService, private changeDetectorRef: ChangeDetectorRef, private _sanitizer: DomSanitizer, public dialog: MatDialog, private generalService: GeneralService, private router: Router) {
    this.currentLanguage = this.translate.currentLang ? this.translate.currentLang : this.translate.defaultLang
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLanguage = event.lang;
    });
  }

  ngOnInit(): void {
    this.changeDetectorRef.detectChanges();
    this.findAll()
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  @ViewChild('focus', { read: ElementRef }) tableInput: ElementRef;
  scrollUp(): void {
    setTimeout(() => window.scrollTo(0, 0));
  }
  open(card) {
    this.router.navigate(['/research/' + card.id])
  }

  findAll() {
    this.cards = []
    this.generalService.allResearch().subscribe((res: any) => {
      res.forEach(element => {
        let languages = element.langs.filter(c => c.language == this.currentLanguage)[0]
        let description = languages.description && languages.description.length > 400 ? languages.description.slice(0, 320) + '...read more...' : languages.description
        let file = this._sanitizer.bypassSecurityTrustUrl('data:image/png;base64' + element.files[0].file)
        let card = new CardDisplay(element.idResearch, languages.title, description, file)
        this.cards.push(card)
      });
      this.dataSource = new MatTableDataSource<any>(this.cards);
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
    });
  }


}
