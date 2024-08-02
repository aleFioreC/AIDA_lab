import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/service/general.service';


@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {

  cards: any[] = [];
  years: any[] = [];
  now: number;
  score = 5;

  imageSource;

  constructor(private service: GeneralService) { }

  ngOnInit(): void {
    this.now = new Date().getFullYear();
    this.buildYears()
    this.service.allPublication(this.now).subscribe((res: any) => {
      res.forEach(element => {
        element.restResourseDTOList.forEach(el => {
          if (!this.cards.filter(c => c.name == el.name)[0]) {
            this.cards.push(el)
          }
        })
      })
    })
  }

  buildYears() {
    for (let j = this.now - 1; j > this.now - this.score; j--) {
      this.years.push(j)
    }
  }

  search(year) {
    this.cards = []
    this.now = year
    this.service.allPublication(year).subscribe((res: any) => {
      res.forEach(element => {
        element.restResourseDTOList.forEach(el => {
          if (!this.cards.filter(c => c.name == el.name)[0]) {
            this.cards.push(el)
          }
        })
      })
    })
  }
}
