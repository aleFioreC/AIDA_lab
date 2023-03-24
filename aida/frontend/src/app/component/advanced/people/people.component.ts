import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/service/general.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {


  all = []
  associate = [];
  full = [];
  researcher = [];
  technicalStaff = [];

  constructor(private router: Router, private _sanitizer: DomSanitizer, private generalService: GeneralService) { }

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
      this.technicalStaff = this.all.filter(c => c.roleGroup == 'Technical staff')
      this.researcher = this.all.filter(c => c.roleGroup == 'Scientific staff')
      this.associate = this.all.filter(c => c.roleGroup == 'Faculty')
      this.full = this.all.filter(c => c.roleGroup == 'Chair')
    });
  }

  open(card) {
    this.router.navigate(['/people/' + card.idPeople])
  }

}
