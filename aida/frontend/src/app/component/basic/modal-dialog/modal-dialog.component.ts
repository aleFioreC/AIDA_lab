import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})
export class ModalDialogComponent implements OnInit {

  message;
  title;
  icon;
  class;

  constructor(
    @Inject(MAT_DIALOG_DATA) data) {
    this.title = data.title
    this.message = data.message;
    this.icon = data.icon;
    this.class = data.class
  }

  ngOnInit(): void {
  }

}
