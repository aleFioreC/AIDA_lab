import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { CardDisplay } from 'src/app/model/card_display';
import { News } from 'src/app/model/news';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {

  news: CardDisplay;
  file: SafeUrl;
  currentLanguage;

  constructor(private translate: TranslateService, private _sanitizer: DomSanitizer, private activatedRoute: ActivatedRoute) {
    this.currentLanguage = this.translate.currentLang ? this.translate.currentLang : this.translate.defaultLang
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLanguage = event.lang;
    });
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response: any) => {
      let languages = response.news.langs.filter(c => c.language == this.currentLanguage)[0]
      this.file = response.news.file != null ? this._sanitizer.bypassSecurityTrustUrl('data:image/png;base64' + response.news.file) : null
      this.news = new CardDisplay(response.news.idNews, languages.title, languages.description, response.news.file)
    });
  }

}
