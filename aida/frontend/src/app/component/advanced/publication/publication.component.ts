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
    this.year = '2023'
    this.service.allPublication('2023').subscribe((res: any) => {
      res.restResourseDTOList.forEach(element => {
        this.cards.push(element)
      })
    })
  }

  search(year) {
    this.cards = []
    this.year = year
    this.service.allPublication(year).subscribe((res: any) => {
      res.restResourseDTOList.forEach(element => {
        this.cards.push(element)
      })
    })
  }
}
