import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {HttpClientModule} from '@angular/common/http';
import {TextInputComponent} from './inputs/text-input/text-input.component';
import { SwitchEltComponent } from './switch-elt/switch-elt.component';
import { NavigationComponent } from './navigation/navigation.component';


@NgModule({
  declarations: [TextInputComponent, SwitchEltComponent, NavigationComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    LoggerModule.forRoot({level: NgxLoggerLevel.DEBUG, serverLogLevel: NgxLoggerLevel.ERROR})
  ],
  exports: [TextInputComponent, SwitchEltComponent, NavigationComponent]
})
export class B4LibModule {
}
