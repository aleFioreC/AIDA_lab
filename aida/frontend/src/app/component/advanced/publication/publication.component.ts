import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/service/general.service';


@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {

  cards: any[] = [];

  imageSource;

  constructor(private service: GeneralService) { }

  ngOnInit(): void {
    this.service.allPublication().subscribe((res: any) => {
      res.resultList.forEach(element => {
        this.cards.push(element)
      })
    })
  }

}
