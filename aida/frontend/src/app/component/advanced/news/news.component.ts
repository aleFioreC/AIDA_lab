import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/service/general.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  cards = [];

  imageSource;

  constructor(private _sanitizer: DomSanitizer, private generalService: GeneralService) { }

  ngOnInit(): void {
    this.generalService.allNews().subscribe((res: any) => {
      this.imageSource = this._sanitizer.bypassSecurityTrustUrl('data:image/png;base64' + res[0].file)
      res.forEach(element => {
        this.cards.push(element)
      });
    });
  }

}
