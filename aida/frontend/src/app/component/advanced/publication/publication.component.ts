import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Mario  Molinara', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Mario  Molinara', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Mario  Molinara', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Antonio Corbo', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'User user', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Antonio Corbo', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Antonio Corbo', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Claudio De Stefano', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {

  cards = [];

  imageSource;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.toLowerCase();
  }

  constructor() { }

  ngOnInit(): void {

  }

}
