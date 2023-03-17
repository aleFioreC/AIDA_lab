import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalDialogComponent } from 'src/app/component/basic/modal-dialog/modal-dialog.component';
import { News } from 'src/app/model/news';
import { People } from 'src/app/model/people';
import { Research } from 'src/app/model/research';
import { ResearchFiles } from 'src/app/model/research_files';
import { Thesis } from 'src/app/model/thesis';
import { GeneralService } from 'src/app/service/general.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css']
})
export class InsertComponent implements OnInit {

  imageSource;
  images = [];

  state: any

  requiredFormNews: FormGroup;
  requiredFormResearch: FormGroup;
  requiredFormPeople: FormGroup;
  requiredFormThesis: FormGroup;

  @ViewChild('fileInput')
  fileInput: ElementRef;

  ngOnInit(): void {
  }

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
    this.requiredFormThesis = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.compose([Validators.required, Validators.maxLength(1024)])],
    });
  }

  async uploadListener($event: any) {
    let files = $event.srcElement.files;
    let img = await this.convertBase64(files[0])
    this.imageSource = img
  }

  clear() {
    this.fileInput.nativeElement.value = ''
    this.imageSource = null
    this.images = []
    this.requiredFormNews.reset()
    this.requiredFormResearch.reset()
    this.requiredFormPeople.reset()
    this.requiredFormThesis.reset()
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          this.images.push(event.target.result);
        }

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  delete(image) {
    this.fileInput.nativeElement.value = ''
    if (image) {
      console.log(image)
    } else {
      this.imageSource = null
    }
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

  saveThesis() {
    let obj: Thesis = new Thesis(this.requiredFormThesis.value.title, this.requiredFormThesis.value.description, this.imageSource)
    this.generalService.saveThesis(obj).subscribe(res => {
      this.openDialog()
      this.router.navigate(['/private'], { state: { user: res } });
    })
  }

  saveResearch() {
    let files: ResearchFiles[] = []
    this.images.forEach(element => {
      let file = new ResearchFiles(element)
      files.push(file)
    })
    let obj: Research = new Research(this.requiredFormResearch.value.title, this.requiredFormResearch.value.description, this.requiredFormResearch.value.year, files)
    this.generalService.saveResearch(obj).subscribe(res => {
      this.openDialog()
      files = []
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
