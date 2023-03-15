import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/service/general.service';

@Component({
  selector: 'app-thesis',
  templateUrl: './thesis.component.html',
  styleUrls: ['./thesis.component.css']
})
export class ThesisComponent implements OnInit {

  cards = [];

  constructor(private _sanitizer: DomSanitizer, private generalService: GeneralService, private router: Router) { }

  ngOnInit(): void {
    this.findAll()
  }

  open(card) {
    this.router.navigate(['/thesis/' + card.idThesis])
  }

  findAll() {
    this.cards = []
    this.generalService.allThesis().subscribe((res: any) => {
      res.forEach(element => {
        element.description = element.description && element.description.length > 400 ? element.description.slice(0, 320) + '...read more...' : element.description
        element.file = this._sanitizer.bypassSecurityTrustUrl('data:image/png;base64' + element.file)
        this.cards.push(element)
      });
    });
  }


}
