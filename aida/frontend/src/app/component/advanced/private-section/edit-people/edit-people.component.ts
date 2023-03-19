import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDialogComponent } from 'src/app/component/basic/modal-dialog/modal-dialog.component';
import { People } from 'src/app/model/people';
import { GeneralService } from 'src/app/service/general.service';

@Component({
  selector: 'app-edit-people',
  templateUrl: './edit-people.component.html',
  styleUrls: ['./edit-people.component.css']
})
export class EditPeopleComponent implements OnInit {

  imageSource;
  state: any
  people: People;
  edit = false;

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
      this.people = response.people
      this.edit = false;
      this.imageSource = this.people.file != null ? this._sanitizer.bypassSecurityTrustUrl('data:image/png;base64' + this.people.file) : null
      this.setValue()
    });
  }

  myForm() {
    this.requiredForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      role: ['', Validators.required],
      group: ['', Validators.required],
      additionalInfo: [''],
      number: ['', Validators.required]
    });
  }

  setValue() {
    this.requiredForm.patchValue({ name: this.people.name, surname: this.people.surname, email: this.people.email, role: this.people.role, additionalInfo: this.people.additionalInfo, number: this.people.number, group: this.people.roleGroup })
  }

  delete() {
    this.fileInput.nativeElement.value = ''
    this.imageSource = null
  }

  savePeople() {
    let obj: People = new People(this.requiredForm.value.name, this.requiredForm.value.surname, this.requiredForm.value.email, this.requiredForm.value.number, this.requiredForm.value.additionalInfo, this.requiredForm.value.role, this.requiredForm.value.group, this.edit ? this.imageSource : this.people.file)
    this.generalService.editPeople(this.people.idPeople, obj).subscribe(res => {
      this.openDialog()
      this.edit = false;
      this.router.navigate(['/private'], { state: { user: this.state } });
    })
  }

  async uploadListener($event: any) {
    let files = $event.srcElement.files;
    let img = await this.convertBase64(files[0])
    this.imageSource = img
    this.edit = true
  }

  clear() {
    this.fileInput.nativeElement.value = ''
    this.imageSource = null;
    this.requiredForm.reset()
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
