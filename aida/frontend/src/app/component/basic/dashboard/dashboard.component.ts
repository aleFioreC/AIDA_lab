import { Component } from '@angular/core';
import { GeneralService } from 'src/app/service/general.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CardLayout } from 'src/app/model/card_layout';
import { News } from 'src/app/model/news';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  cards: CardLayout[] = [];

  constructor(private _sanitizer: DomSanitizer, private generalService: GeneralService) { }

  ngOnInit(): void {
    this.generalService.allNews().subscribe((res: any) => {
      res.forEach(element => {
        element.file = this._sanitizer.bypassSecurityTrustUrl('data:image/png;base64' + element.file)
        let card = new CardLayout(element.title, '2', '1', element.description, element.file)
        this.cards.push(card)
      });
    });
  }

}
