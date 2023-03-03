import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GeneralService } from 'src/app/service/general.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalDialogComponent } from '../../basic/modal-dialog/modal-dialog.component';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CardLayout } from 'src/app/model/card_layout';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})
export class ResearchComponent implements OnInit {

  cards = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<CardLayout>;
  obs: Observable<any>;

  constructor(private changeDetectorRef: ChangeDetectorRef, private _sanitizer: DomSanitizer, public dialog: MatDialog, private generalService: GeneralService, private router: Router) { }

  ngOnInit(): void {
    this.changeDetectorRef.detectChanges();
    this.findAll()
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  /*   remove(card) {
      this.generalService.deleteResearch(card.idResearch).subscribe(res => {
        this.findAll()
        this.openDialog()
      })
    } */

  @ViewChild('focus', { read: ElementRef }) tableInput: ElementRef;
  scrollUp(): void {
    setTimeout(() => window.scrollTo(0, 0));
  }

  open(card) {
    this.router.navigate(['/research/' + card.idResearch])
  }

  findAll() {
    this.cards = []
    this.generalService.allResearch().subscribe((res: any) => {
      res.forEach(element => {
        element.description = element.description && element.description.length > 500 ? element.description.slice(0, 320) : element.description
        element.file = this._sanitizer.bypassSecurityTrustUrl('data:image/png;base64' + element.file)
        this.cards.push(element)
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
