import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GeneralService } from 'src/app/service/general.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalDialogComponent } from '../../basic/modal-dialog/modal-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})
export class ResearchComponent implements OnInit {

  cards = [];

  constructor(private _sanitizer: DomSanitizer, public dialog: MatDialog, private generalService: GeneralService, private router: Router) { }

  ngOnInit(): void {
    this.findAll()
  }

  remove(card) {
    this.generalService.deleteResearch(card.idResearch).subscribe(res => {
      this.findAll()
      this.openDialog()
    })
  }

  open(card) {
    this.router.navigate(['/research/' + card.idResearch])
  }

  findAll() {
    this.cards = []
    this.generalService.allResearch().subscribe((res: any) => {
      res.forEach(element => {
        element.file = this._sanitizer.bypassSecurityTrustUrl('data:image/png;base64' + element.file)
        this.cards.push(element)
      });
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
