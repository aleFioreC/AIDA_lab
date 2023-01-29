import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/model/news';
import { GeneralService } from 'src/app/service/general.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from '../../basic/modal-dialog/modal-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  imageSource;
  title;
  description;

  constructor(private generalService: GeneralService, public dialog: MatDialog, public router: Router) { }

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

  ngOnInit(): void {
  }

  save() {
    let obj: News = new News(this.title, this.description, this.imageSource)
    this.generalService.saveNews(obj).subscribe(res => {
      this.dialog.open(ModalDialogComponent)
      this.router.navigate(['/news']);
    })
  }

}
