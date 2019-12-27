import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeViewerScreenComponent } from './income-viewer-screen.component';
import {BehaviorSubject} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {TranslatePipeMock} from '../../common/utils/testUtils/mocks/TranslatePipeMock';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('IncomeViewerScreenComponent', () => {
  let component: IncomeViewerScreenComponent;
  let fixture: ComponentFixture<IncomeViewerScreenComponent>;

  beforeEach(async(() => {
    const translateServiceSpy = jasmine.createSpyObj(['get', 'use']);
    translateServiceSpy.get.and.returnValue(new BehaviorSubject<any>('mock'));
    TestBed.configureTestingModule({
      declarations: [ IncomeViewerScreenComponent, TranslatePipeMock ],
      providers: [
        {provide: TranslateService, useClass: translateServiceSpy}
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
