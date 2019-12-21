import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeScreenComponent } from './income-screen.component';

describe('IncomeScreenComponent', () => {
  let component: IncomeScreenComponent;
  let fixture: ComponentFixture<IncomeScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
