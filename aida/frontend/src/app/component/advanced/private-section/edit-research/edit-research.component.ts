import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDialogComponent } from 'src/app/component/basic/modal-dialog/modal-dialog.component';
import { Research } from 'src/app/model/research';
import { GeneralService } from 'src/app/service/general.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ResearchFiles } from 'src/app/model/research_files';

@Component({
  selector: 'app-edit-research',
  templateUrl: './edit-research.component.html',
  styleUrls: ['./edit-research.component.css']
})
export class EditResearchComponent implements OnInit {

  state;
  research: Research;
  images: SafeResourceUrl[] = []
  requiredForm: FormGroup;
  edit = false;

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
        this.edit = false;
        let image = element != null ? this._sanitizer.bypassSecurityTrustUrl('data:image/png;base64' + element.file) : null
        if (image) this.images.push(image)
      })
      this.setValue()
    });
  }

  myForm() {
    this.requiredForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.compose([Validators.required, Validators.maxLength(1024)])],
      year: ['']
    });
  }

  setValue() {
    this.requiredForm.patchValue({ title: this.research.title, description: this.research.description })
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          this.images.push(event.target.result);
        }
        this.edit = true
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  delete(image) {
    this.fileInput.nativeElement.value = ''
    if (image) {
      console.log(image)
    }
  }

  saveResearch() {
    let files: ResearchFiles[] = []
    if (this.edit) {
      this.images.forEach(element => {
        let file = new ResearchFiles(element)
        files.push(file)
      })
    }
    let obj: Research = new Research(this.requiredForm.value.title, this.requiredForm.value.description, this.requiredForm.value.year, this.edit ? files : this.research.files)
    this.generalService.editResearch(this.research.idResearch, obj).subscribe(res => {
      this.openDialog()
      files = []
      this.edit = false;
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
    this.fileInput.nativeElement.value = ''
    this.images = [];
    this.requiredForm.reset()
  }

  back() {
    this.router.navigate(['/private'], { state: { user: this.state } })
  }


}
