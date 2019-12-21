import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomeScreenComponent } from './income-screen/income-screen.component';
import {B4LibModule} from '../b4-lib/b4-lib.module';
import {IncomeRepository} from './services/IncomeRepository';



@NgModule({
  declarations: [IncomeScreenComponent],
  imports: [
    CommonModule,
    B4LibModule
  ],
  exports: [IncomeScreenComponent],
  providers: [IncomeRepository]
})
export class B4ExpensesModule { }
