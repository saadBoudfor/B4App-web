import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {HttpClientModule} from '@angular/common/http';
import {NavigationComponent} from './navigation/navigation.component';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
  declarations: [NavigationComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    LoggerModule.forRoot({level: NgxLoggerLevel.DEBUG, serverLogLevel: NgxLoggerLevel.ERROR}),
    TranslateModule
  ],
  exports: [NavigationComponent]
})
export class B4LibModule {
}
