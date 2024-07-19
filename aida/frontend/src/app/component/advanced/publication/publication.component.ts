import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/service/general.service';


@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {

  cards: any[] = [];
  year: string;

  imageSource;

  constructor(private service: GeneralService) { }

  ngOnInit(): void {
    this.year = '2024'
    this.service.allPublication(this.year).subscribe((res: any) => {
      res.forEach(element => {
        element.restResourseDTOList.forEach(el => {
          this.cards.push(el)
        })
      })
    })
  }

  search(year) {
    this.cards = []
    this.year = year
    this.service.allPublication(year).subscribe((res: any) => {
      res.forEach(element => {
        element.restResourseDTOList.forEach(el => {
          this.cards.push(el)
        })
      })
    })
  }
}
