import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalDialogComponent } from 'src/app/component/basic/modal-dialog/modal-dialog.component';
import { Thesis } from 'src/app/model/thesis';
import { ThesisLang } from 'src/app/model/thesis_lang';
import { GeneralService } from 'src/app/service/general.service';

@Component({
  selector: 'app-insert-thesis',
  templateUrl: './insert-thesis.component.html',
  styleUrls: ['./insert-thesis.component.css']
})
export class InsertThesisComponent implements OnInit {


  imageSource;

  state: any

  requiredFormThesis: FormGroup;

  @ViewChild('fileInput')
  fileInput: ElementRef;

  constructor(private fb: FormBuilder, private generalService: GeneralService, public dialog: MatDialog, public router: Router, private location: Location) {
    this.state = this.location.getState();
    this.myForm();
    if (!this.state.user) {
      this.router.navigate(['/']);
    }
  }
  ngOnInit(): void {
  }

  myForm() {
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

  clear() {
    this.fileInput.nativeElement.value = ''
    this.imageSource = null
    this.requiredFormThesis.reset()
  }

  delete() {
    this.fileInput.nativeElement.value = ''
    this.imageSource = null
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
