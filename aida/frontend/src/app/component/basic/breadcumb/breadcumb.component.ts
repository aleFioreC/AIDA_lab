import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-breadcumb',
  templateUrl: './breadcumb.component.html',
  styleUrls: ['./breadcumb.component.css']
})
export class BreadcumbComponent implements OnInit {

  @Input() breadcumb =  []

  ngOnInit(): void {
  }

}
