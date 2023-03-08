import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GeneralService } from 'src/app/service/general.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  all = []
  associate = [];
  full = [];
  researcher = [];

  constructor(private _sanitizer: DomSanitizer, private generalService: GeneralService) { }

  ngOnInit(): void {
    this.findAll()
  }

  findAll() {
    this.researcher = []
    this.full = []
    this.associate = []
    this.all = []
    this.generalService.allPeople().subscribe((res: any) => {
      res.forEach(element => {
        element.file = this._sanitizer.bypassSecurityTrustUrl('data:image/png;base64' + element.file)
        this.all.push(element)
      });
      this.researcher = this.all.filter(c => c.role == 'Researcher')
      this.associate = this.all.filter(c => c.role == 'Associate Professor')
      this.full = this.all.filter(c => c.role == 'Full Professor')
    });
  }

}
