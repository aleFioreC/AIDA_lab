import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { CardDisplay } from 'src/app/model/card_display';

@Component({
  selector: 'app-thesis-detail',
  templateUrl: './thesis-detail.component.html',
  styleUrls: ['./thesis-detail.component.css']
})
export class ThesisDetailComponent implements OnInit {

  
  breadcrumb =  [
    {
      label: 'Home',
      url: '/',
      class: 'breadcrumb-item',
      active: false
    },
    {
      label: 'Thesis',
      url: '/thesis',
      class: 'breadcrumb-item',
      active: false
    },
    {
      label: 'Detail',
      class: 'breadcrumb-item',
      active: true
    }
  ]

  thesis: CardDisplay;
  file: SafeUrl;
  currentLanguage;

  constructor(private location: Location, private translate: TranslateService, private _sanitizer: DomSanitizer, private activatedRoute: ActivatedRoute) {
    this.currentLanguage = this.translate.currentLang ? this.translate.currentLang : this.translate.defaultLang
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLanguage = event.lang;
    });
  }
  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response: any) => {
      let languages = response.thesis.langs.filter(c => c.language == this.currentLanguage)[0]
      this.file = response.thesis.file != null ? this._sanitizer.bypassSecurityTrustUrl('data:image/png;base64' + response.thesis.file) : null
      this.thesis = new CardDisplay(response.thesis.idThesis, languages.title, languages.description, response.thesis.file)
    });
  }

  back() {
    this.location.back()
  }

}
