import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {IncomeListScreenComponent} from './income-list-screen.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {TranslatePipeMock} from '../../common/utils/testUtils/mocks/TranslatePipeMock';
import {ExpensesRouterService} from '../expenses-routing/expenses-router.service';
import {IncomeService} from '../services/IncomeService';

describe('IncomeListScreenComponent', () => {
  let component: IncomeListScreenComponent;
  let fixture: ComponentFixture<IncomeListScreenComponent>;

  beforeEach(async(() => {
    const translateServiceSpy = jasmine.createSpyObj(['get', 'use']);
    translateServiceSpy.get.and.returnValue(new BehaviorSubject<any>('mock'));
    const routerServiceSpy = jasmine.createSpyObj(['goTo']);
    routerServiceSpy.goTo.and.callFake(console.log);
    const incomeServiceSpy = jasmine.createSpyObj(['getAll']);
    incomeServiceSpy.getAll.and.returnValue([]);

    TestBed.configureTestingModule({
      declarations: [IncomeListScreenComponent, TranslatePipeMock],
      providers: [
        {provide: TranslateService, useValue: translateServiceSpy},
        {provide: ExpensesRouterService, useValue: routerServiceSpy},
        {provide: IncomeService, useValue: incomeServiceSpy}
      ],
      schemas: [NO_ERRORS_SCHEMA]
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
