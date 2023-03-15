import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GeneralService } from 'src/app/service/general.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Research } from 'src/app/model/research';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})
export class ResearchComponent implements OnInit {

  cards: Research[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;
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
        element.description = element.description && element.description.length > 400 ? element.description.slice(0, 320) + '...read more...' : element.description
        element.file = this._sanitizer.bypassSecurityTrustUrl('data:image/png;base64' + element.files[0].file)
        this.cards.push(element)
      });
      this.dataSource = new MatTableDataSource<any>(this.cards);
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
    });
  }


}
