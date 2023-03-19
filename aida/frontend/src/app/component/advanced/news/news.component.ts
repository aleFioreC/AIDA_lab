import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { CardDisplay } from 'src/app/model/card_display';
import { News } from 'src/app/model/news';
import { GeneralService } from 'src/app/service/general.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  cards: CardDisplay[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;
  obs: Observable<any>;
  card: CardDisplay;
  currentLanguage = ''

  constructor(private translate: TranslateService, private changeDetectorRef: ChangeDetectorRef, private _sanitizer: DomSanitizer, public dialog: MatDialog, private generalService: GeneralService, private router: Router) {
    this.currentLanguage = this.translate.currentLang ? this.translate.currentLang : this.translate.defaultLang
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLanguage = event.lang;
    });
  }

  @ViewChild('focus', { read: ElementRef }) tableInput: ElementRef;
  scrollUp(): void {
    setTimeout(() => window.scrollTo(0, 0));
  }

  open(card) {
    this.router.navigate(['/news/' + card.id])
  }

  ngOnInit() {
    this.changeDetectorRef.detectChanges();
    this.findTop()
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  findTop() {
    this.generalService.topNews().subscribe((res: News) => {
      let languages = res.langs.filter(c => c.language == this.currentLanguage)[0]
      this.card = new CardDisplay(res.idNews, languages.title, languages.description, res.file)
      this.findAll(res)
    })
  }

  findAll(news) {
    this.cards = []
    if (news) {
      this.generalService.allNews().subscribe((res: News[]) => {
        res.forEach(element => {
          let languages = element.langs.filter(c => c.language == this.currentLanguage)[0]
          let description = languages.description && languages.description.length > 400 ? languages.description.slice(0, 320) + '...read more...' : languages.description
          let file = element.file != null ? this._sanitizer.bypassSecurityTrustUrl('data:image/png;base64' + element.file) : null
          let card = new CardDisplay(element.idNews, languages.title, description, file)
          this.cards.push(card)
        });
        this.cards = this.cards.filter(c => c.id != news.idNews)
        this.dataSource = new MatTableDataSource<any>(this.cards);
        this.dataSource.paginator = this.paginator;
        this.obs = this.dataSource.connect();
      });
    }
  }

}
