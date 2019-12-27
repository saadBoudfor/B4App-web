import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeListScreenComponent } from './income-list-screen.component';

describe('IncomeListScreenComponent', () => {
  let component: IncomeListScreenComponent;
  let fixture: ComponentFixture<IncomeListScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeListScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeListScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
