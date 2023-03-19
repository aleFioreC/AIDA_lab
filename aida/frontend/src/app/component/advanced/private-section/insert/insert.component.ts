import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalDialogComponent } from 'src/app/component/basic/modal-dialog/modal-dialog.component';
import { News } from 'src/app/model/news';
import { NewsLang } from 'src/app/model/news_lang';
import { People } from 'src/app/model/people';
import { Research } from 'src/app/model/research';
import { ResearchFiles } from 'src/app/model/research_files';
import { ResearchLang } from 'src/app/model/research_lang';
import { Thesis } from 'src/app/model/thesis';
import { ThesisLang } from 'src/app/model/thesis_lang';
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
      titleIt: ['', Validators.required],
      descriptionIt: ['', Validators.compose([Validators.required, Validators.maxLength(1024)])],
      titleEn: ['', Validators.required],
      descriptionEn: ['', Validators.compose([Validators.required, Validators.maxLength(1024)])],
    });
    this.requiredFormResearch = this.fb.group({
      titleIt: ['', Validators.required],
      descriptionIt: ['', Validators.compose([Validators.required, Validators.maxLength(1024)])],
      titleEn: ['', Validators.required],
      descriptionEn: ['', Validators.compose([Validators.required, Validators.maxLength(1024)])],
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
      titleIt: ['', Validators.required],
      descriptionIt: ['', Validators.compose([Validators.required, Validators.maxLength(1024)])],
      titleEn: ['', Validators.required],
      descriptionEn: ['', Validators.compose([Validators.required, Validators.maxLength(1024)])],
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
      if (image) {
        let index = this.images.indexOf(image)
        if (index > -1) {
          this.images.splice(index, 1);
        }
      }
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
    this.generalService.saveNews(this.getNews()).subscribe(res => {
      this.openDialog()
      this.router.navigate(['/private'], { state: { user: res } });
    })
  }

  getNews() {
    let langs: NewsLang[] = []
    let it = new NewsLang(this.requiredFormNews.value.titleIt, this.requiredFormNews.value.descriptionIt, 'it')
    let en = new NewsLang(this.requiredFormNews.value.titleEn, this.requiredFormNews.value.descriptionEn, 'en')
    langs.push(it)
    langs.push(en)
    return new News(this.imageSource, langs)
  }

  saveThesis() {
    this.generalService.saveThesis(this.getThesis()).subscribe(res => {
      this.openDialog()
      this.router.navigate(['/private'], { state: { user: res } });
    })
  }

  getThesis() {
    let langs: ThesisLang[] = []
    let it = new ThesisLang(this.requiredFormThesis.value.titleIt, this.requiredFormThesis.value.descriptionIt, 'it')
    let en = new ThesisLang(this.requiredFormThesis.value.titleEn, this.requiredFormThesis.value.descriptionEn, 'en')
    langs.push(it)
    langs.push(en)
    return new Thesis(this.imageSource, langs)
  }

  saveResearch() {
    this.generalService.saveResearch(this.getResearch()).subscribe(res => {
      this.openDialog()
      this.router.navigate(['/private'], { state: { user: res } });
    })
  }

  getResearch() {
    let files: ResearchFiles[] = []
    this.images.forEach(element => {
      let file = new ResearchFiles(element)
      files.push(file)
    })
    let langs: ResearchLang[] = []
    let it = new ResearchLang(this.requiredFormResearch.value.titleIt, this.requiredFormResearch.value.descriptionIt, 'it')
    let en = new ResearchLang(this.requiredFormResearch.value.titleEn, this.requiredFormResearch.value.descriptionEn, 'en')
    langs.push(it)
    langs.push(en)
    return new Research(this.requiredFormResearch.value.year, langs, files)
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
