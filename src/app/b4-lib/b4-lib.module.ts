import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { B4InputComponent } from './b4-input/b4-input.component';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [B4InputComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    LoggerModule.forRoot({ level: NgxLoggerLevel.DEBUG, serverLogLevel: NgxLoggerLevel.ERROR})
  ],
  exports: [B4InputComponent]
})
export class B4LibModule { }
