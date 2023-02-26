import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpClient]
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  constructor(private translate: TranslateService) {
  }

  setLanguage(language: string) {
    this.translate.use(language)
  }
}
