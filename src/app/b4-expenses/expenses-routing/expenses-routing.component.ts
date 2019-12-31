import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ExpensesRouterService} from './expenses-router.service';

@Component({
  selector: 'expenses-routing',
  templateUrl: './expenses-routing.component.html'
})
export class ExpensesRoutingComponent implements OnInit {

  @ViewChild('expenseScreen', {static: true, read: ViewContainerRef}) entry: ViewContainerRef;

  constructor(private routerService: ExpensesRouterService) {
  }

  ngOnInit() {
    this.routerService.componentFactory = this.entry;
  }

}
