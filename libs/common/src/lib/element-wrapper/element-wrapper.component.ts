import { Component, ComponentFactoryResolver, ComponentRef, HostBinding, Type, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'major-project-element-wrapper',
  templateUrl: './element-wrapper.component.html',
  styleUrls: ['./element-wrapper.component.scss']
})
export class ElementWrapperComponent {
  @HostBinding('class.element-wrapper') 
  public class: boolean = true;
  @ViewChild('wrapper', { static: true, read: ViewContainerRef })
  wrapper: ViewContainerRef;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentRef: any;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  clear(): void {
    this.wrapper.clear();
  }

  addComponent<T>(component: Type<T>): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      component
    );
    this.componentRef = this.wrapper.createComponent<T>(
      componentFactory
    );
  }
}
