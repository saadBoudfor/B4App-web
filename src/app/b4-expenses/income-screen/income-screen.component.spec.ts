import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {IncomeScreenComponent} from './income-screen.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {IncomeService} from '../services/IncomeService';
import {MaterialModule} from '../MaterialModule';
import {BehaviorSubject} from 'rxjs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {Income} from '../models/Income';
import {TranslatePipeMock} from '../../common/utils/testUtils/mocks/TranslatePipeMock';
import {ExpensesRouterService} from '../expenses-routing/expenses-router.service';
import {ObjectUtils} from '../utils/ObjectUtils';


class IncomeServiceMock {
  save(income: Income) {
    console.log('save income: ' + ObjectUtils.toString(income));
  }
}

describe('IncomeScreenComponent', () => {
  let component: IncomeScreenComponent;
  let fixture: ComponentFixture<IncomeScreenComponent>;

  beforeEach(async(() => {
    const translateServiceSpy = jasmine.createSpyObj(['get', 'use']);
    translateServiceSpy.get.and.returnValue(new BehaviorSubject<any>('mock'));
    const routerServiceSpy = jasmine.createSpyObj(['goTo']);
    routerServiceSpy.goTo.and.callFake(console.log);
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,
        FormsModule,
        TranslateModule,
        MaterialModule,
        BrowserAnimationsModule,
        CommonModule
      ],
      declarations: [IncomeScreenComponent, TranslatePipeMock],
      providers: [
        {provide: IncomeService, useClass: IncomeServiceMock},
        {provide: TranslateService, useValue: translateServiceSpy},
        {provide: ExpensesRouterService, useValue: routerServiceSpy}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeScreenComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('empty income form should be invalid', () => {
    expect(component.incomeForm.valid).toBeFalsy();
    expect(component.submitIncomeForm()).toBeUndefined();
  });

  it('origin input should be required', () => {
    const originInput = component.incomeForm.controls.origin;
    expect(originInput.valid).toBeFalsy();
    expect(originInput.errors.required).toBeTruthy();
  });
  it('amount input should be required', () => {
    const amountInput = component.incomeForm.controls.amount;
    expect(amountInput.valid).toBeFalsy();
    expect(amountInput.errors.required).toBeTruthy();
  });
  it('transferDate input should be required', () => {
    const transferDateInput = component.incomeForm.controls.transferDate;
    expect(transferDateInput.valid).toBeFalsy();
    expect(transferDateInput.errors.required).toBeTruthy();
  });
});
