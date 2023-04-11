import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { People } from 'src/app/model/people';

@Component({
  selector: 'app-people-detail',
  templateUrl: './people-detail.component.html',
  styleUrls: ['./people-detail.component.css']
})
export class PeopleDetailComponent implements OnInit {

  people: People;
  file: any;

  constructor(private location: Location, private _sanitizer: DomSanitizer, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response: any) => {
      this.people = response.people
      this.file = this.people.file != null ? this._sanitizer.bypassSecurityTrustUrl('data:image/png;base64' + this.people.file) : null
    });
  }

  back() {
    this.location.back()
  }

}
