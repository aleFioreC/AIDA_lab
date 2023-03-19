import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { CardDisplay } from 'src/app/model/card_display';
import { GeneralService } from 'src/app/service/general.service';

@Component({
  selector: 'app-thesis',
  templateUrl: './thesis.component.html',
  styleUrls: ['./thesis.component.css']
})
export class ThesisComponent implements OnInit {

  cards = [];
  currentLanguage = '';

  constructor(private translate: TranslateService, private _sanitizer: DomSanitizer, private generalService: GeneralService, private router: Router) {
    this.currentLanguage = this.translate.currentLang ? this.translate.currentLang : this.translate.defaultLang
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLanguage = event.lang;
    });
  }

  ngOnInit(): void {
    this.findAll()
  }

  open(card) {
    this.router.navigate(['/thesis/' + card.id])
  }

  findAll() {
    this.cards = []
    this.generalService.allThesis().subscribe((res: any) => {
      res.forEach(element => {
        let languages = element.langs.filter(c => c.language == this.currentLanguage)[0]
        let description = languages.description && languages.description.length > 400 ? languages.description.slice(0, 320) + '...read more...' : languages.description
        let file = this._sanitizer.bypassSecurityTrustUrl('data:image/png;base64' + element.file)
        let card = new CardDisplay(element.idThesis, languages.title, description, file)
        this.cards.push(card)
      });
    });
  }


}
