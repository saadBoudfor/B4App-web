import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {IncomeScreenComponent} from './income-screen.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NO_ERRORS_SCHEMA, Pipe, PipeTransform} from '@angular/core';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {IncomeService} from '../services/IncomeService';
import {MaterialModule} from '../MaterialModule';
import {BehaviorSubject} from 'rxjs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {Income} from '../models/Income';
import {IncomeBuilder} from '../builders/IncomeBuilder';
import {Currency} from '../models/Currency';

@Pipe({name: 'translate'})
class MockPipe implements PipeTransform {
  transform(value: any): any {
    return value;
  }

  get(value: any): any {
    return new BehaviorSubject<any>('mock-' + value);
  }
}

class IncomeServiceMock {
  save(income: Income) {
    console.log(income);
  }
}

describe('IncomeScreenComponent', () => {
  let component: IncomeScreenComponent;
  let fixture: ComponentFixture<IncomeScreenComponent>;

  beforeEach(async(() => {
    const translateServiceSpy = jasmine.createSpyObj(['get', 'use']);
    translateServiceSpy.get.and.returnValue(new BehaviorSubject<any>('mock'));
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,
        FormsModule,
        TranslateModule,
        MaterialModule,
        BrowserAnimationsModule,
        CommonModule
      ],
      declarations: [IncomeScreenComponent, MockPipe],
      providers: [
        {provide: IncomeService, useClass: IncomeServiceMock},
        {provide: TranslateService, useClass: translateServiceSpy}
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

  it('submitting a form adding new income', () => {
    const expectedIncome: Income = IncomeBuilder
      .builder
      .origin('transfer test')
      .transferDate(new Date())
      .amount({value: 111, currency: Currency.EUR})
      .build();
    const originInput = component.incomeForm.controls.origin;
    const amountInput = component.incomeForm.controls.amount;
    const transferDateInput = component.incomeForm.controls.transferDate;
    originInput.setValue(expectedIncome.origin);
    amountInput.setValue(expectedIncome.amount.value);
    transferDateInput.setValue(expectedIncome.transferDate);
    expect(component.incomeForm.valid).toBeTruthy();
    expect(component.submitIncomeForm()).toEqual(expectedIncome);
  });
});
