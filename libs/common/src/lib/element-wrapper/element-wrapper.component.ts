import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  HostBinding,
  Input,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

@Component({
  selector: 'major-project-element-wrapper',
  templateUrl: './element-wrapper.component.html',
  styleUrls: ['./element-wrapper.component.scss']
})
export class ElementWrapperComponent {
  @HostBinding('class.element-wrapper')
  public class: boolean = true;

  @HostBinding('class.--no-reverse')
  @Input()
  public noReverse: boolean = false;

  @ViewChild('wrapper', { static: true, read: ViewContainerRef })
  private wrapper: ViewContainerRef;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public elements: ComponentRef<any>[] = [];

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  clear(): void {
    this.wrapper.clear();
  }

  addComponent<T>(component: Type<T>, keepReference?: boolean): ComponentRef<T> {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const componentRef = this.wrapper.createComponent<T>(componentFactory);
    if (keepReference) {
      this.elements.push(componentRef);
    }
    return componentRef;
  }
}
