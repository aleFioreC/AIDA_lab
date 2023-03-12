import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalDialogComponent } from 'src/app/component/basic/modal-dialog/modal-dialog.component';
import { News } from 'src/app/model/news';
import { People } from 'src/app/model/people';
import { Research } from 'src/app/model/research';
import { GeneralService } from 'src/app/service/general.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css']
})
export class InsertComponent implements OnInit {

  imageSource;

  state: any

  requiredFormNews: FormGroup;
  requiredFormResearch: FormGroup;
  requiredFormPeople: FormGroup;

  constructor(private fb: FormBuilder, private generalService: GeneralService, public dialog: MatDialog, public router: Router, private location: Location) {
    this.state = this.location.getState();
    this.myForm();
    if (!this.state.user) {
      this.router.navigate(['/']);
    }
  }

  myForm() {
    this.requiredFormNews = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.compose([Validators.required, Validators.maxLength(1024)])],
    });
    this.requiredFormResearch = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.compose([Validators.required, Validators.maxLength(1024)])],
      year: ['', Validators.required]
    });
    this.requiredFormPeople = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      role: ['', Validators.required],
      additionalInfo: [''],
      number: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  async uploadListener($event: any) {
    let files = $event.srcElement.files;
    let img = await this.convertBase64(files[0])
    this.imageSource = img
  }

  clear() {
    this.requiredFormNews.reset()
    this.requiredFormResearch.reset()
    this.requiredFormPeople.reset()
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
    let obj: News = new News(this.requiredFormNews.value.title, this.requiredFormNews.value.description, this.imageSource)
    this.generalService.saveNews(obj).subscribe(res => {
      this.openDialog()
      this.router.navigate(['/private'], { state: { user: res } });
    })
  }

  saveResearch() {
    let obj: Research = new Research(this.requiredFormResearch.value.title, this.requiredFormResearch.value.description, this.requiredFormResearch.value.year, this.imageSource)
    this.generalService.saveResearch(obj).subscribe(res => {
      this.openDialog()
      this.router.navigate(['/private'], { state: { user: res } });
    })
  }

  savePeople() {
    let obj: People = new People(this.requiredFormPeople.value.name, this.requiredFormPeople.value.surname, this.requiredFormPeople.value.email, this.requiredFormPeople.value.number, this.requiredFormPeople.value.additionalInfo, this.requiredFormPeople.value.role, this.imageSource)
    this.generalService.savePeople(obj).subscribe(res => {
      this.openDialog()
      this.router.navigate(['/private'], { state: { user: res } });
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

  back() {
    this.router.navigate(['/private'], { state: { user: this.state } })
  }


}
