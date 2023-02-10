import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GeneralService } from 'src/app/service/general.service';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})
export class ResearchComponent implements OnInit {

  cards = [];

  constructor(private _sanitizer: DomSanitizer, private generalService: GeneralService) { }

  ngOnInit(): void {
    this.generalService.allResearch().subscribe((res: any) => {
      res.forEach(element => {
        element.file = this._sanitizer.bypassSecurityTrustUrl('data:image/png;base64' + element.file)
        this.cards.push(element)
      });
    });
  }


}
