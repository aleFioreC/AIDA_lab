import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalDialogComponent } from 'src/app/component/basic/modal-dialog/modal-dialog.component';
import { People } from 'src/app/model/people';
import { GeneralService } from 'src/app/service/general.service';

@Component({
  selector: 'app-insert-people',
  templateUrl: './insert-people.component.html',
  styleUrls: ['./insert-people.component.css']
})
export class InsertPeopleComponent implements OnInit {

  imageSource;

  state: any

  requiredFormPeople: FormGroup;

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
    this.requiredFormPeople = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      role: ['', Validators.required],
      group: ['', Validators.required],
      additionalInfo: [''],
      number: ['', Validators.required],
      cf: ['', Validators.compose([Validators.required, Validators.minLength(16), Validators.maxLength(16)])],
    });
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

  savePeople() {
    let obj: People = new People(this.requiredFormPeople.value.name, this.requiredFormPeople.value.surname, this.requiredFormPeople.value.email, this.requiredFormPeople.value.number, this.requiredFormPeople.value.additionalInfo, this.requiredFormPeople.value.role, this.requiredFormPeople.value.group, this.imageSource)
    this.generalService.savePeople(obj).subscribe(res => {
      this.openDialog()
      this.router.navigate(['/private'], { state: { user: res } });
    })
  }


  clear() {
    this.fileInput.nativeElement.value = ''
    this.imageSource = null
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
