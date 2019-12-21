import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TextInputComponent} from './text-input.component';
import {LoggerConfig, NGXLogger, NGXLoggerHttpService, NgxLoggerLevel, NGXMapperService} from 'ngx-logger';
import {NGXLoggerHttpServiceMock, NGXMapperServiceMock} from 'ngx-logger/testing';

describe('TextInputComponent', () => {
  let component: TextInputComponent;
  let fixture: ComponentFixture<TextInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TextInputComponent],
      providers: [NGXLogger,
        {provide: NGXLoggerHttpService, useClass: NGXLoggerHttpServiceMock},
        {provide: NGXMapperService, useClass: NGXMapperServiceMock},
        {provide: LoggerConfig, useValue: {level: NgxLoggerLevel.ERROR}}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
