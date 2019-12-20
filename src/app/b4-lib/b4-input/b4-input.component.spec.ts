import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B4InputComponent } from './b4-input.component';

describe('B4InputComponent', () => {
  let component: B4InputComponent;
  let fixture: ComponentFixture<B4InputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B4InputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B4InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
