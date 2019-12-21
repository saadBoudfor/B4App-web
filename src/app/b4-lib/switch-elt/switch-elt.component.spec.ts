import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchEltComponent } from './switch-elt.component';

describe('SwitchComponent', () => {
  let component: SwitchEltComponent;
  let fixture: ComponentFixture<SwitchEltComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchEltComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchEltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
