import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CardLayout } from 'src/app/model/card_layout';
import { GeneralService } from 'src/app/service/general.service';
import { ModalDialogComponent } from '../../basic/modal-dialog/modal-dialog.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  cards: CardLayout[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<CardLayout>;
  obs: Observable<any>;
  card;

  constructor(private changeDetectorRef: ChangeDetectorRef, private _sanitizer: DomSanitizer, public dialog: MatDialog, private generalService: GeneralService, private router: Router) { }

  @ViewChild('focus', { read: ElementRef }) tableInput: ElementRef;
  scrollUp(): void {
    setTimeout(() => window.scrollTo(0, 0));
  }

  open(card) {
    this.router.navigate(['/news/' + card.id])
  }

  ngOnInit() {
    this.changeDetectorRef.detectChanges();
    this.findAll()
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  findAll() {
    this.cards = []
    this.generalService.allNews().subscribe((res: any) => {
      res.forEach(element => {
        element.description = element.description && element.description.length > 400 ? element.description.slice(0, 320) + '...read more...' : element.description
        element.file = element.file != null ? this._sanitizer.bypassSecurityTrustUrl('data:image/png;base64' + element.file) : null
        let card = new CardLayout(element.idNews, element.title, '2', '1', element.description, element.file, element.creationDate)
        this.cards.push(card)
      });
      this.dataSource = new MatTableDataSource<CardLayout>(this.cards);
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
      this.card = this.cards[0]
    });
  }

}
