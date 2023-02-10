import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GeneralService } from 'src/app/service/general.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  cards = [];

  imageSource;

  constructor(private _sanitizer: DomSanitizer, private generalService: GeneralService) { }

  ngOnInit(): void {
    this.generalService.allPeople().subscribe((res: any) => {
      this.imageSource = this._sanitizer.bypassSecurityTrustUrl('data:image/png;base64' + res[0].file)
      res.forEach(element => {
        this.cards.push(element)
      });
    });
  }

}
