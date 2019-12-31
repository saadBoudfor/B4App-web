import {CoreConstants} from './CoreConstants';
import {ComponentFactoryResolver, Injectable, Type, ViewContainerRef} from '@angular/core';

@Injectable()
export class ExpensesRouterService {

  private currentScreen = CoreConstants.screenMapper['show-income-list'];
  private componentManager: ViewContainerRef;

  constructor(private componentResolver: ComponentFactoryResolver) {
  }

  goTo(screenID: string, input: { key: string, value: any } = null) {
    this.currentScreen = CoreConstants.screenMapper[screenID];
    this.createComponent(input);
  }

  set componentFactory(entry: ViewContainerRef) {
    this.componentManager = entry;
    this.createComponent();
  }

  createComponent(param: { key: string, value: any } = null) {
    this.componentManager.clear();
    const factoryProperty = '_factories';
    const factories = Array.from(this.componentResolver[factoryProperty].keys());
    const componentFactory = factories.find((x: any) => x.name === this.currentScreen);
    const componentResolver = this.componentResolver.resolveComponentFactory(componentFactory as Type<any>);
    const component = this.componentManager.createComponent(componentResolver);
    if (param) {
      component.instance[param.key] = param.value;
    }
  }
}
