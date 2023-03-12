import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/service/general.service';

@Component({
  selector: 'app-top-news',
  templateUrl: './top-news.component.html',
  styleUrls: ['./top-news.component.css']
})
export class TopNewsComponent implements OnInit {

  card;

  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
    this.findTop()
  }

  findTop() {
    this.generalService.topNews().subscribe((res: any) => {
      this.card = res
    })
  }

}
