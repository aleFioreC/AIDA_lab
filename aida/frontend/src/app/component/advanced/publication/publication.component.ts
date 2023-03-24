import { Component, OnInit } from '@angular/core';
import { IRISPublication } from 'src/app/model/iris/iris_publication';
import { IRISResult } from 'src/app/model/iris/iris_result';
import { GeneralService } from 'src/app/service/general.service';


@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {

  cards: IRISPublication[] = [];

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
