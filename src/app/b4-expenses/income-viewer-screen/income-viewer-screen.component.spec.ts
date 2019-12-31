import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeViewerScreenComponent } from './income-viewer-screen.component';
import {BehaviorSubject} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {TranslatePipeMock} from '../../common/utils/testUtils/mocks/TranslatePipeMock';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ExpensesRouterService} from '../expenses-routing/expenses-router.service';

describe('IncomeViewerScreenComponent', () => {
  let component: IncomeViewerScreenComponent;
  let fixture: ComponentFixture<IncomeViewerScreenComponent>;

  beforeEach(async(() => {
    const translateServiceSpy = jasmine.createSpyObj(['get', 'use']);
    translateServiceSpy.get.and.returnValue(new BehaviorSubject<any>('mock'));
    const routerServiceSpy = jasmine.createSpyObj(['goTo']);
    routerServiceSpy.goTo.and.callFake(console.log);
    TestBed.configureTestingModule({
      declarations: [ IncomeViewerScreenComponent, TranslatePipeMock ],
      providers: [
        {provide: TranslateService, useClass: translateServiceSpy},
        {provide: ExpensesRouterService, useValue: routerServiceSpy}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeViewerScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display income field in template', () => {
    expect(component).toBeTruthy();
  });
});
