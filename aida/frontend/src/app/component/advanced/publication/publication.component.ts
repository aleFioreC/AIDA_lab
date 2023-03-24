import { Component, OnInit } from '@angular/core';
import { IRISResult } from 'src/app/model/iris/iris_result';
import { Publication } from 'src/app/model/iris/publication';
import { GeneralService } from 'src/app/service/general.service';


@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {

  cards: Publication[] = [];

  imageSource;

  constructor(private service: GeneralService) { }

  ngOnInit(): void {
    this.service.allPublication().subscribe((res: IRISResult) => {
      res.resultList.forEach(element => {
        this.cards.push(element)
      })
    })
  }

  search(year) {
    this.cards = []
    this.service.allPublication().subscribe((res: IRISResult) => {
      res.resultList.forEach(element => {
        this.cards.push(element)
      })
    })
  }
}
