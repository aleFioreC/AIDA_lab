import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertResearchComponent } from './insert-research.component';

describe('InsertResearchComponent', () => {
  let component: InsertResearchComponent;
  let fixture: ComponentFixture<InsertResearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertResearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertResearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
