import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDialogComponent } from 'src/app/component/basic/modal-dialog/modal-dialog.component';
import { News } from 'src/app/model/news';
import { GeneralService } from 'src/app/service/general.service';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css']
})
export class EditNewsComponent implements OnInit {

  imageSource;
  title;
  description;
  state;
  news;

  constructor(private _sanitizer: DomSanitizer, private activatedRoute: ActivatedRoute, private generalService: GeneralService, public dialog: MatDialog, public router: Router, private location: Location) { }

  ngOnInit(): void {
    this.state = this.location.getState();
    if (!this.state.user) {
      this.router.navigate(['/']);
    }
    this.activatedRoute.data.subscribe((response: any) => {
      this.news = response.news
      this.imageSource = this.news.file != null ? this._sanitizer.bypassSecurityTrustUrl('data:image/png;base64' + this.news.file) : null
    });
  }

  async uploadListener($event: any) {
    let files = $event.srcElement.files;
    let img = await this.convertBase64(files[0])
    this.imageSource = img
  }

  convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  saveNews() {
    let obj: News = new News(this.title, this.description, this.imageSource)
    this.generalService.editNews(this.news.idNews, obj).subscribe(res => {
      this.openDialog()
      this.router.navigate(['/private'], { state: { user: this.state } });
    })
  }


  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '220px'
    dialogConfig.width = '600px'

    dialogConfig.data = {
      title: 'Operazione completata',
      message: 'Salvataggio effettuato correttamente.',
      class: 'success-class'
    };

    this.dialog.open(ModalDialogComponent, dialogConfig);

  }

  clear() {
    this.imageSource = null;
    this.title = null;
    this.description = null;
  }

  back() {
    this.router.navigate(['/private'], { state: { user: this.state } })
  }

}