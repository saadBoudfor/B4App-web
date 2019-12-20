import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {B4LibModule} from './b4-lib/b4-lib.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    B4LibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
