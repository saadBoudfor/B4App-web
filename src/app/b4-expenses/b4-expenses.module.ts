import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IncomeScreenComponent} from './income-screen/income-screen.component';
import {B4LibModule} from '../b4-lib/b4-lib.module';
import {IncomeService} from './services/IncomeService';
import {MaterialModule} from './MaterialModule';
import {TranslateModule} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';
import {IncomeRepository} from './persistence/IncomeRepository';
import {IncomeViewerScreenComponent} from './income-viewer-screen/income-viewer-screen.component';
import {IncomeListScreenComponent} from './income-list-screen/income-list-screen.component';
import {ExpensesRoutingComponent} from './expenses-routing/expenses-routing.component';
import {ExpensesRouterService} from './expenses-routing/expenses-router.service';


@NgModule({
  declarations: [IncomeScreenComponent, IncomeViewerScreenComponent, IncomeListScreenComponent, ExpensesRoutingComponent],
  imports: [
    CommonModule,
    MaterialModule,
    B4LibModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  exports: [IncomeScreenComponent, IncomeViewerScreenComponent, IncomeListScreenComponent, ExpensesRoutingComponent],
  providers: [IncomeService, IncomeRepository, ExpensesRouterService],
  entryComponents: [IncomeScreenComponent, IncomeViewerScreenComponent, IncomeListScreenComponent, ExpensesRoutingComponent]
})
export class B4ExpensesModule {
}
