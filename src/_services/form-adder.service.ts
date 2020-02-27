import { ComponentFactoryResolver, Inject, ReflectiveInjector, Injectable, ViewContainerRef } from '@angular/core';
import { SwimFormComponent } from '../app/swim-form/swim-form.component';

@Injectable({
  providedIn: 'root'
})
export class FormAdderService {

  public factoryResolver: ComponentFactoryResolver;
  public rootViewContainer: ViewContainerRef;
  constructor(@Inject(ComponentFactoryResolver) factoryResolver) { 
    this.factoryResolver = factoryResolver;
  }

  setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef
  }

  addSwimForm() {
    const factory = this.factoryResolver.resolveComponentFactory(SwimFormComponent)
    const component = factory.create(this.rootViewContainer.parentInjector)
    this.rootViewContainer.insert(component.hostView)
  }
}
