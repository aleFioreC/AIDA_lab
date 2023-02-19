import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/model/news';
import { GeneralService } from 'src/app/service/general.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalDialogComponent } from '../../basic/modal-dialog/modal-dialog.component';
import { Router } from '@angular/router';
import { People } from 'src/app/model/people';
import { Research } from 'src/app/model/research';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  imageSource;
  title;
  description;
  name;
  surname;
  year;
  role;

  selected;

  showPeople: boolean = false;
  showNews: boolean = false;
  showResearch: boolean = false;


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

  selection() {
    if (this.selected == 'news') {
      this.showNews = true
      this.showPeople = false
      this.showResearch = false
    }
    else if (this.selected == 'research') {
      this.showResearch = true
      this.showNews = false
      this.showPeople = false
    }
    else if (this.selected == 'people') {
      this.showPeople = true
      this.showNews = false
      this.showResearch = false
    }
  }

  ngOnInit(): void {
  }

  saveNews() {
    let obj: News = new News(this.title, this.description, this.imageSource)
    this.generalService.saveNews(obj).subscribe(res => {
      this.openDialog()
      this.router.navigate(['/']);
    })
  }

  saveResearch() {
    let obj: Research = new Research(this.title, this.description, this.year, this.imageSource)
    this.generalService.saveResearch(obj).subscribe(res => {
      this.openDialog()
      this.router.navigate(['/research']);
    })
  }

  savePeople() {
    let obj: People = new People(this.name, this.surname, this.role, this.imageSource)
    this.generalService.savePeople(obj).subscribe(res => {
      this.openDialog()
      this.router.navigate(['/people']);
    })
  }


  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      title: 'Operazione completata',
      message: 'La risorsa è stata salvata.',
      icon: 'check'
    };

    this.dialog.open(ModalDialogComponent, dialogConfig);

  }

}
