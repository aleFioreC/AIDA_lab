import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { CardDisplay } from 'src/app/model/card_display';
import { News } from 'src/app/model/news';
import { GeneralService } from 'src/app/service/general.service';

@Component({
  selector: 'app-top-news',
  templateUrl: './top-news.component.html',
  styleUrls: ['./top-news.component.css']
})
export class TopNewsComponent implements OnInit {

  card;
  currentLanguage: any;

  constructor(private translate: TranslateService, private generalService: GeneralService, private router: Router) { }

  ngOnInit(): void {
    this.currentLanguage = this.translate.currentLang ? this.translate.currentLang : this.translate.defaultLang
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLanguage = event.lang;
    });
    this.findTop()
  }

  open(card) {
    this.router.navigate(['/news/' + card.id])
  }

  findTop() {
    this.generalService.topNews().subscribe((res: News) => {
      if (res && res.langs) {
        let languages = res.langs.filter(c => c.language == this.currentLanguage)[0]
        this.card = new CardDisplay(res.idNews, languages.title, languages.description, res.file)
      }
    })
  }

}
