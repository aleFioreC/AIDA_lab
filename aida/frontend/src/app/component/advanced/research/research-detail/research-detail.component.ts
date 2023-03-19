import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { CardDisplay } from 'src/app/model/card_display';
import { Research } from 'src/app/model/research';

@Component({
  selector: 'app-research-detail',
  templateUrl: './research-detail.component.html',
  styleUrls: ['./research-detail.component.css']
})
export class ResearchDetailComponent implements OnInit {

  research: CardDisplay;
  file: SafeResourceUrl;
  currentLanguage;
  files: SafeResourceUrl[] = [];

  constructor(private translate: TranslateService, private _sanitizer: DomSanitizer, private activatedRoute: ActivatedRoute) {
    this.currentLanguage = this.translate.currentLang ? this.translate.currentLang : this.translate.defaultLang
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLanguage = event.lang;
    });
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response: any) => {
      response.research.files.forEach(element => {
        this.file = response.research.files != null ? this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64' + element.file) : null
        this.files.push(this.file)
      });
      let languages = response.research.langs.filter(c => c.language == this.currentLanguage)[0]
      this.research = new CardDisplay(response.research.idResearch, languages.title, languages.description, this.file)
    });
  }

}
