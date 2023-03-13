import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { News } from 'src/app/model/news';
import { GeneralService } from 'src/app/service/general.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  cards: News[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;
  obs: Observable<any>;
  card;

  constructor(private changeDetectorRef: ChangeDetectorRef, private _sanitizer: DomSanitizer, public dialog: MatDialog, private generalService: GeneralService, private router: Router) { }

  @ViewChild('focus', { read: ElementRef }) tableInput: ElementRef;
  scrollUp(): void {
    setTimeout(() => window.scrollTo(0, 0));
  }

  open(card) {
    this.router.navigate(['/news/' + card.idNews])
  }

  ngOnInit() {
    this.changeDetectorRef.detectChanges();
    this.findTop()
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  findTop() {
    this.generalService.topNews().subscribe((res: any) => {
      this.card = res
      this.findAll(this.card)
    })
  }

  findAll(news) {
    this.cards = []
    if (news) {
      this.generalService.allNews().subscribe((res: any) => {
        res.forEach(element => {
          element.description = element.description && element.description.length > 400 ? element.description.slice(0, 320) + '...read more...' : element.description
          element.file = element.file != null ? this._sanitizer.bypassSecurityTrustUrl('data:image/png;base64' + element.file) : null
          this.cards.push(element)
        });
        this.cards = this.cards.filter(c => c.idNews != news.idNews)
        this.dataSource = new MatTableDataSource<any>(this.cards);
        this.dataSource.paginator = this.paginator;
        this.obs = this.dataSource.connect();
      });
    }
  }

}
