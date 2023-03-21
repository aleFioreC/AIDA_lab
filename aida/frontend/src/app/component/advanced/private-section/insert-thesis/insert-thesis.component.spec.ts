import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertThesisComponent } from './insert-thesis.component';

describe('InsertThesisComponent', () => {
  let component: InsertThesisComponent;
  let fixture: ComponentFixture<InsertThesisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertThesisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertThesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
