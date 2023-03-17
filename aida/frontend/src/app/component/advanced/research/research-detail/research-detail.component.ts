import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Research } from 'src/app/model/research';

@Component({
  selector: 'app-research-detail',
  templateUrl: './research-detail.component.html',
  styleUrls: ['./research-detail.component.css']
})
export class ResearchDetailComponent implements OnInit {

  research: Research;
  file: SafeResourceUrl;
  files: SafeResourceUrl[] = [];

  constructor(private _sanitizer: DomSanitizer, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response: any) => {
      this.research = response.research
      this.research.files.forEach(element => {
        this.file = this.research.files != null ? this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64' + element.file) : null
        this.files.push(this.file)
      });
    });
  }

}
