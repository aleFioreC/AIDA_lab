import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Thesis } from 'src/app/model/thesis';

@Component({
  selector: 'app-thesis-detail',
  templateUrl: './thesis-detail.component.html',
  styleUrls: ['./thesis-detail.component.css']
})
export class ThesisDetailComponent implements OnInit {

  thesis: Thesis;
  file: any;

  constructor(private _sanitizer: DomSanitizer, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response: any) => {
      this.thesis = response.thesis
      this.file = this.thesis.file != null ? this._sanitizer.bypassSecurityTrustUrl('data:image/png;base64' + this.thesis.file) : null
    });
  }

}
