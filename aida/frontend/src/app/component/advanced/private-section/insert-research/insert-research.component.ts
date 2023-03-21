import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalDialogComponent } from 'src/app/component/basic/modal-dialog/modal-dialog.component';
import { Research } from 'src/app/model/research';
import { ResearchFiles } from 'src/app/model/research_files';
import { ResearchLang } from 'src/app/model/research_lang';
import { GeneralService } from 'src/app/service/general.service';

@Component({
  selector: 'app-insert-research',
  templateUrl: './insert-research.component.html',
  styleUrls: ['./insert-research.component.css']
})
export class InsertResearchComponent implements OnInit {

  images = [];

  state: any

  requiredFormResearch: FormGroup;

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
    this.requiredFormResearch = this.fb.group({
      titleIt: ['', Validators.required],
      descriptionIt: ['', Validators.compose([Validators.required, Validators.maxLength(1024)])],
      titleEn: ['', Validators.required],
      descriptionEn: ['', Validators.compose([Validators.required, Validators.maxLength(1024)])],
      year: ['', Validators.required]
    });
  }

  clear() {
    this.fileInput.nativeElement.value = ''
    this.images = []
    this.requiredFormResearch.reset()
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
