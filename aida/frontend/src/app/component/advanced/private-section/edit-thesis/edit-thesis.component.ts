import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDialogComponent } from 'src/app/component/basic/modal-dialog/modal-dialog.component';
import { Thesis } from 'src/app/model/thesis';
import { ThesisLang } from 'src/app/model/thesis_lang';
import { GeneralService } from 'src/app/service/general.service';

@Component({
  selector: 'app-edit-thesis',
  templateUrl: './edit-thesis.component.html',
  styleUrls: ['./edit-thesis.component.css']
})
export class EditThesisComponent implements OnInit {

  imageSource;
  state;
  thesis;

  requiredForm: FormGroup;

  @ViewChild('fileInput')
  fileInput: ElementRef;

  constructor(private fb: FormBuilder, private _sanitizer: DomSanitizer, private activatedRoute: ActivatedRoute, private generalService: GeneralService, public dialog: MatDialog, public router: Router, private location: Location) {
    this.myForm()
  }

  ngOnInit(): void {
    this.state = this.location.getState();
    if (!this.state.user) {
      this.router.navigate(['/']);
    }
    this.activatedRoute.data.subscribe((response: any) => {
      this.thesis = response.thesis
      this.imageSource = this.thesis.file != null ? this._sanitizer.bypassSecurityTrustUrl('data:image/png;base64' + this.thesis.file) : null
      this.setValue()
    });
  }

  myForm() {
    this.requiredForm = this.fb.group({
      titleIt: ['', Validators.required],
      descriptionIt: ['', Validators.compose([Validators.required, Validators.maxLength(1500)])],
      titleEn: ['', Validators.required],
      descriptionEn: ['', Validators.compose([Validators.required, Validators.maxLength(1500)])],
    });
  }

  setValue() {
    let it = this.thesis.langs.filter(c => c.language == 'it')[0]
    let en = this.thesis.langs.filter(c => c.language == 'en')[0]
    if (it && en) {
      this.requiredForm.patchValue({
        titleIt: it.title, descriptionIt: it.description,
        titleEn: en.title, descriptionEn: en.description,
      })
    }
  }

  async uploadListener($event: any) {
    let files = $event.srcElement.files;
    let img = await this.convertBase64(files[0])
    this.imageSource = img
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

  saveThesis() {
    this.generalService.editThesis(this.thesis.idThesis, this.getThesis()).subscribe(res => {
      this.openDialog()
      this.router.navigate(['/private'], { state: { user: this.state } });
    })
  }

  getThesis() {
    let langs: ThesisLang[] = []
    let it = new ThesisLang(this.requiredForm.value.titleIt, this.requiredForm.value.descriptionIt, 'it')
    let en = new ThesisLang(this.requiredForm.value.titleEn, this.requiredForm.value.descriptionEn, 'en')
    langs.push(it)
    langs.push(en)
    return new Thesis(this.imageSource, langs)
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
    this.fileInput.nativeElement.value = ''
    this.imageSource = null;
    this.requiredForm.reset()
  }

  back() {
    this.router.navigate(['/private'], { state: { user: this.state } })
  }

}
