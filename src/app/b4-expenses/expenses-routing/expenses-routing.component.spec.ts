import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesRoutingComponent } from './expenses-routing.component';
import {ExpensesRouterService} from './expenses-router.service';

describe('ExpensesRoutingComponent', () => {
  let component: ExpensesRoutingComponent;
  let fixture: ComponentFixture<ExpensesRoutingComponent>;

  beforeEach(async(() => {
    const routerServiceMock = jasmine.createSpyObj(['componentFactory']);
    TestBed.configureTestingModule({
      declarations: [ ExpensesRoutingComponent ],
      providers: [
        {provide: ExpensesRouterService, useValue: routerServiceMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
