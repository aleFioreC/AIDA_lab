import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { News } from 'src/app/model/news';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard-detail',
  templateUrl: './dashboard-detail.component.html',
  styleUrls: ['./dashboard-detail.component.css']
})
export class DashboardDetailComponent implements OnInit {

  news: News;
  file: any;

  constructor(private _sanitizer: DomSanitizer, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response: any) => {
      console.log(response)
      this.news = response.news
      this.file = this._sanitizer.bypassSecurityTrustUrl('data:image/png;base64' + this.news.file)
    });
  }

}
