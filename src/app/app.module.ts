import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {B4LibModule} from './b4-lib/b4-lib.module';
import {B4ExpensesModule} from './b4-expenses/b4-expenses.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    B4LibModule,
    B4ExpensesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
