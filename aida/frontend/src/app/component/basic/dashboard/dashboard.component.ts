import { Component, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { GeneralService } from 'src/app/service/general.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CardLayout } from 'src/app/model/card_layout';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  cards: CardLayout[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<CardLayout>;
  obs: Observable<any>;

  constructor(private changeDetectorRef: ChangeDetectorRef, private _sanitizer: DomSanitizer, public dialog: MatDialog, private generalService: GeneralService, private router: Router) { }

  /*   remove(card) {
      this.generalService.deletNews(card.id).subscribe(res => {
        this.findAll()
        this.openDialog()
      })
    } */

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
    });
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      title: 'Operazione completata',
      message: 'La risorsa è stata eliminata.'
    };

    this.dialog.open(ModalDialogComponent, dialogConfig);

  }

}
