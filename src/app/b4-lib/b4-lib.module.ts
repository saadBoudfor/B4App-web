import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {HttpClientModule} from '@angular/common/http';
import {TextInputComponent} from './inputs/text-input/text-input.component';
import { SwitchComponent } from './switch/switch.component';


@NgModule({
  declarations: [TextInputComponent, SwitchComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    LoggerModule.forRoot({level: NgxLoggerLevel.DEBUG, serverLogLevel: NgxLoggerLevel.ERROR})
  ],
  exports: [TextInputComponent, SwitchComponent]
})
export class B4LibModule {
}
