import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/service/general.service';

@Component({
  selector: 'app-top-news',
  templateUrl: './top-news.component.html',
  styleUrls: ['./top-news.component.css']
})
export class TopNewsComponent implements OnInit {

  card;

  constructor(private generalService: GeneralService, private router: Router) { }

  ngOnInit(): void {
    this.findTop()
  }

  open(card) {
    this.router.navigate(['/news/' + card.idNews])
  }

  findTop() {
    this.generalService.topNews().subscribe((res: any) => {
      this.card = res
    })
  }

}
