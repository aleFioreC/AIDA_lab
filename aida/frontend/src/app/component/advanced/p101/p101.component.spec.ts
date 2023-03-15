import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P101Component } from './p101.component';

describe('P101Component', () => {
  let component: P101Component;
  let fixture: ComponentFixture<P101Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ P101Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(P101Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
