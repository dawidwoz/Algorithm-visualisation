import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { ElementComponent, ArrowComponent, ElementWrapperComponent } from '@major-project/common';

const NULL = 'null';

@Component({
  selector: 'major-project-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent {
  @ViewChild('animationArea', { static: true, read: ViewContainerRef })
  animationArea: ViewContainerRef;
  @ViewChild('size', { static: true, read: ViewContainerRef }) sizeInput: ViewContainerRef;
  @ViewChild('animationSpeed', { static: true, read: ViewContainerRef })
  animationSpeedInput: ViewContainerRef;
  @ViewChild('result', { static: true, read: ViewContainerRef }) result: ViewContainerRef;
  @ViewChild('newElement', { static: true, read: ViewContainerRef })
  newElementInput: ViewContainerRef;

  public implementation?: string;
  public elements: ComponentRef<ElementComponent>[] = [];
  public arrowElements: ComponentRef<ArrowComponent>[] = [];
  public usedImplementation?: string;
  public inProgress: boolean = false;
  public headPosition: number = 0;
  public tailPosition: number = 0;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    protected readonly target: ViewContainerRef
  ) {}

  setImplementation(implementation: string): void {
    this.implementation = implementation;
    if (this.implementation === 'singly-linked-list') {
      this.sizeInput.element.nativeElement.value = '';
    }
  }

  createQueue(): void {
    this.usedImplementation = this.implementation;
    this.animationArea.clear();
    this.elements = [];
    switch (this.usedImplementation) {
      case 'simple-array':
        this.arrayImplementation();
        break;
      case 'singly-linked-list':
        this.listImplementation();
        break;
    }
  }

  listImplementation(): void {
    this.addElement('head');
    this.addArrow();
    this.addElement('NULL', true);
    this.addArrow();
    this.addElement('tail', true);
  }

  arrayImplementation(): void {
    const size =
      this.sizeInput.element.nativeElement.value !== ''
        ? this.sizeInput.element.nativeElement.value
        : (this.sizeInput.element.nativeElement.value = 5);
    this.headPosition = 0;
    this.tailPosition = 0;
    for (let i = 0; i < size; i++) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        ElementComponent
      );
      const componentRef = this.animationArea.createComponent<ElementComponent>(
        componentFactory
      );
      componentRef.instance.time = this.animationSpeedInput.element.nativeElement.value;
      componentRef.instance.number = i;

      componentRef.instance.value = NULL;
      componentRef.instance.active = true;
      this.elements.push(componentRef);
    }
    this.setHeadTail();
  }

  setActiveElement(instance: ElementComponent, keepCurrent: boolean = false): void {
    for (const element of this.elements) {
      const currentInstance = element.instance;
      if (currentInstance === instance) {
        currentInstance.active = true;
      } else if (!keepCurrent) {
        currentInstance.active = false;
      }
    }
  }

  setHeadTail(): void {
    this.elements.forEach(element => {
      element.instance.texts = [];
    });
    if (this.headPosition === this.tailPosition) {
      this.elements[this.headPosition].instance.texts = ['head', 'tail'];
      return;
    }
    this.elements[this.headPosition].instance.texts = ['head'];
    this.elements[this.tailPosition].instance.texts = ['tail'];
  }

  setArrowDirection(): void {
    const arrowLength = this.arrowElements.length;
    if (1 > arrowLength) return;
    for (const arrowElement of this.arrowElements) {
      const arrowInstance = arrowElement.instance;
      if(arrowInstance === this.arrowElements[arrowLength-1].instance) {
        arrowInstance.direction = 'left';
      } else {
        arrowInstance.direction = 'right';
      }
    }
  }

  addArrow(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ArrowComponent);
    const componentRef = this.animationArea.createComponent<ArrowComponent>(componentFactory);
    this.arrowElements.push(componentRef);
    this.setArrowDirection();
  }

  addElement(value: string, keepCurrentActive: boolean = false): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      ElementComponent
    );
    const componentRef = this.animationArea.createComponent<ElementComponent>(
      componentFactory
    );
    componentRef.instance.time = this.animationSpeedInput.element.nativeElement.value;
    componentRef.instance.value = value;
    this.elements.push(componentRef);
    this.setActiveElement(componentRef.instance, keepCurrentActive);
  }

  pushStack(): void {
    let value = this.newElementInput.element.nativeElement.value;
    if (value === '') return;
    value = parseInt(value);
    value = value > 999 ? 999 : value;
    this.newElementInput.element.nativeElement.value = value;
    switch (this.usedImplementation) {
      case 'simple-array':
        this.pushArrayImplementation(value);
        break;
      case 'singly-linked-list':
        this.pushListImplementation(value);
        break;
    }
  }

  addGroupElement(values: string[]): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      ElementWrapperComponent
    );
    const componentRef = this.animationArea.createComponent<ElementWrapperComponent>(
      componentFactory
    );
    const addElements: ComponentRef<ElementComponent>[] = [];
    this.setActiveElement(undefined, false);
    for (const value of values) {
      componentRef.instance.addComponent<ElementComponent>(ElementComponent);
      componentRef.instance.componentRef.instance.value = value;
      componentRef.instance.componentRef.instance.active = true;
      addElements.push(componentRef.instance.componentRef);
    }
    this.elements = this.elements.concat(addElements.reverse());
  }

  pushListImplementation(value: string): void {
    for (const element of this.elements) {
      if (element.instance.value === 'NULL') {
        element.destroy();
        this.elements = this.elements.filter(
          item => item.instance != element.instance
        );
        this.arrowElements[this.arrowElements.length - 1].destroy();
      }
    }

    this.elements[this.elements.length - 1].destroy();
    this.elements = this.elements.slice(0, this.elements.length - 1);
    this.addGroupElement(['next', value]);
    this.addArrow();
    this.addElement('tail', true);
  }

  pushArrayImplementation(value: string): void {
    const headArray = this.elements
    .slice(this.headPosition, this.elements.length)
    .concat(this.elements.slice(0, this.headPosition));
    for (const element of headArray) {
      const instance = element.instance;
      if (instance.value === NULL) {
        instance.value = value;
        instance.triggerEnterAnimation();
        this.tailPosition = this.elements[this.tailPosition + 1] ? this.tailPosition + 1 : 0;
        this.setActiveElement(instance);
        this.setHeadTail();
        return;
      }
    }
    this.result.element.nativeElement.value = 'Stack is full!';
  }

  lastElement(removeElement: boolean): void {
    switch (this.usedImplementation) {
      case 'simple-array':
        {
    const headInstance = this.elements[this.headPosition].instance;
    for (const element of this.elements) {
      const instance = element.instance;
      if (
        instance.value !== NULL &&
        instance === headInstance
      ) {
        this.result.element.nativeElement.value = instance.value;
        if (removeElement) {
          this.inProgress = true;
          this.removeElement(instance).then(() => (this.inProgress = false));
        }
        return;
      }
    }
  }
  break;
  case 'singly-linked-list': {
    for (const element of this.elements) {
      const instance = element.instance;
      if (
        instance.value !== NULL &&
        instance.value !== 'tail' &&
        instance.value !== 'next' &&
        instance.value !== 'head' &&
        instance.value !== 'NULL' &&
        instance.value !== 'prev'
      ) {
        this.result.element.nativeElement.value = instance.value;
        if (removeElement) {
          this.inProgress = true;
          this.removeElement(instance).then(() => (this.inProgress = false));
        }
        return;
      }
    }
  }
  break;
}
    this.result.element.nativeElement.value = 'Stack is empty!';
  }

  async removeElement(instance: ElementComponent): Promise<void> {
    switch (this.usedImplementation) {
      case 'simple-array':
        {
          instance.value = NULL;
          this.headPosition = this.elements[this.headPosition + 1] ? this.headPosition + 1 : 0;
          this.setActiveElement(instance);
          this.setHeadTail();
          instance.triggerEnterAnimation();
        }
        break;
      case 'singly-linked-list':
        {
          let isArrowRemoved = false;
          let i = 0;
          for (i = 0; i < this.elements.length; i++) {
            const stackElement = this.elements[i];
            if (stackElement.instance.value === 'next') break;
            stackElement.instance.triggerExitAnimation();
            await new Promise<boolean>(resolve =>
              setTimeout(() => {
                stackElement.destroy();
                resolve(true);
              }, 1500)
            );
            if (!isArrowRemoved) {
              this.arrowElements[0].destroy();
              this.arrowElements = this.arrowElements.slice(1, this.arrowElements.length);
              isArrowRemoved = true;
            }
          }
          this.elements = this.elements.slice(i, this.elements.length);
          const currentElement = this.elements[0].instance;
          currentElement.triggerEnterAnimation();
          currentElement.value = 'head';
          this.setActiveElement(currentElement);
          console.log(this.elements);
          if (this.elements.length == 2) {
            this.createQueue();
          } 
          this.setArrowDirection();
          await new Promise<boolean>(resolve =>
            setTimeout(() => {
              resolve(true);
            }, 750)
          );
        }
        break;
    }
  }
}
