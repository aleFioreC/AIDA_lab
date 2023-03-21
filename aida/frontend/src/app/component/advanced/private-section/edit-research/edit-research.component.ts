import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDialogComponent } from 'src/app/component/basic/modal-dialog/modal-dialog.component';
import { Research } from 'src/app/model/research';
import { GeneralService } from 'src/app/service/general.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ResearchFiles } from 'src/app/model/research_files';
import { ResearchLang } from 'src/app/model/research_lang';

@Component({
  selector: 'app-edit-research',
  templateUrl: './edit-research.component.html',
  styleUrls: ['./edit-research.component.css']
})
export class EditResearchComponent implements OnInit {

  state;
  research: Research;
  images: string[] = []
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
      this.research = response.research
      this.research.files.forEach(element => {
        this.images.push(element.file)
      })
      this.setValue()
    });
  }

  myForm() {
    this.requiredForm = this.fb.group({
      titleIt: ['', Validators.required],
      descriptionIt: ['', Validators.compose([Validators.required, Validators.maxLength(1024)])],
      titleEn: ['', Validators.required],
      descriptionEn: ['', Validators.compose([Validators.required, Validators.maxLength(1024)])],
      year: ['']
    });
  }

  setValue() {
    let it = this.research.langs.filter(c => c.language == 'it')[0]
    let en = this.research.langs.filter(c => c.language == 'en')[0]
    if (it && en) {
      this.requiredForm.patchValue({
        titleIt: it.title, descriptionIt: it.description,
        titleEn: en.title, descriptionEn: en.description,
        year: this.research.year
      })
    }
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
      let index = this.images.indexOf(image)
      if (index > -1) {
        this.images.splice(index, 1);
      }
    }
  }

  saveResearch() {
    this.generalService.editResearch(this.research.idResearch, this.getResearch()).subscribe(res => {
      this.openDialog()
      this.router.navigate(['/private'], { state: { user: this.state } });
    })
  }

  getResearch() {
    let files: ResearchFiles[] = []
    this.images.forEach(element => {
      let file = new ResearchFiles(element)
      files.push(file)
    })
    let langs: ResearchLang[] = []
    let it = new ResearchLang(this.requiredForm.value.titleIt, this.requiredForm.value.descriptionIt, 'it')
    let en = new ResearchLang(this.requiredForm.value.titleEn, this.requiredForm.value.descriptionEn, 'en')
    langs.push(it)
    langs.push(en)
    return new Research(this.requiredForm.value.year, langs, files)
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
    this.images = [];
    this.requiredForm.reset()
  }

  back() {
    this.router.navigate(['/private'], { state: { user: this.state } })
  }


}
