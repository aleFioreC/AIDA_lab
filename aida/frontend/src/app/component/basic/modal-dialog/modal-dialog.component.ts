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

  constructor(
    @Inject(MAT_DIALOG_DATA) data) {
    this.title = data.title
    this.message = data.message;
  }

  ngOnInit(): void {
  }

}
