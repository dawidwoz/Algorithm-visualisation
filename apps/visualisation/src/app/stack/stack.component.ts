import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { StackElementComponent } from '@major-project/stack';
import { ArrowComponent } from '@major-project/common';

const NULL = 'null';

@Component({
  selector: 'major-project-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.scss']
})
export class StackComponent {
  @ViewChild('animationArea', { static: true, read: ViewContainerRef })
  animationArea: ViewContainerRef;
  @ViewChild('size', { static: true, read: ViewContainerRef }) sizeInput: ViewContainerRef;
  @ViewChild('animationSpeed', { static: true, read: ViewContainerRef }) animationSpeedInput: ViewContainerRef;
  @ViewChild('result', { static: true, read: ViewContainerRef }) result: ViewContainerRef;
  @ViewChild('newElement', { static: true, read: ViewContainerRef })
  newElementInput: ViewContainerRef;

  public implementation?: string;
  public elements: ComponentRef<StackElementComponent>[] = [];
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

  createStack(): void {
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
    this.addElement('tail', false);
    this.addArrow();
    this.addElement('NULL', true);
    this.addArrow();
    this.addElement('head', true)
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
        StackElementComponent
      );
      const componentRef = this.animationArea.createComponent<StackElementComponent>(
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

  setActiveElement(instance: StackElementComponent, keepCurrent: boolean = false): void {
    for (const stackElement of this.elements) {
      const currentInstance = stackElement.instance;
      if(currentInstance === instance) {
        currentInstance.active = true;
      } else if(!keepCurrent) {
        currentInstance.active = false;
      }
    }
  }

  setArrowDirection(): void {
    const arrowLength = this.arrowElements.length;
    if (1 > arrowLength) return;
    for (const arrowElement of this.arrowElements) {
      const arrowInstance = arrowElement.instance;
      if(arrowInstance === this.arrowElements[arrowLength-1].instance) {
        arrowInstance.direction = 'right';
      } else {
        arrowInstance.direction = 'left';
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
      StackElementComponent
    );
    const componentRef = this.animationArea.createComponent<StackElementComponent>(
      componentFactory
    );
    componentRef.instance.time = this.animationSpeedInput.element.nativeElement.value;
    componentRef.instance.value = value;
    this.elements.splice(0, 0, componentRef);
    this.setActiveElement(componentRef.instance, keepCurrentActive);
  }

  pushStack(): void {
    const value = this.newElementInput.element.nativeElement.value;
    if (value === '') return;
    switch (this.usedImplementation) {
      case 'simple-array':
        this.pushArrayImplementation(value);
        break;
      case 'singly-linked-list':
        this.pushListImplementation(value);
        break;
    }
  }

  pushListImplementation(value: string): void {
    for(const stackElement of this.elements) {
      if (stackElement.instance.value === 'NULL') {
        stackElement.destroy();
        this.elements = this.elements.filter(item => item.instance != stackElement.instance);
        this.arrowElements[this.arrowElements.length-1].destroy();
      }
    }

    this.elements[0].destroy();
    this.elements = this.elements.slice(1, this.elements.length);
    this.addElement('next', true);
    this.addElement(value);
    this.addArrow();
    this.addElement('head', true);
  }

  pushArrayImplementation(value: string): void {
    for (const stackElement of this.elements) {
      const instance = stackElement.instance;
      if (instance.value === NULL) {
        instance.value = value;
        instance.triggerEnterAnimation();
        this.setActiveElement(instance);
        this.tailPosition = this.elements[this.tailPosition + 1] ? this.tailPosition + 1 : 0;
        this.setHeadTail();
        return;
      }
    }
    this.result.element.nativeElement.value = 'Stack is full!';
  }

  firstElementStack(removeElement: boolean): void {
    for (const stackElement of this.elements) {
      const instance = stackElement.instance;
      if (
        instance.value !== NULL &&
        instance.value !== 'tail' &&
        instance.value !== 'next' &&
        instance.value !== 'head' &&
        instance.value !== 'NULL'
      ) {
        this.result.element.nativeElement.value = instance.value;
        if (removeElement) {
          this.inProgress = true;
          this.removeElement(instance).then(() => (this.inProgress = false));
        }
        return;
      }
    }
    this.result.element.nativeElement.value = 'Stack is empty!';
  }

  async removeElement(instance: StackElementComponent): Promise<void> {
    switch (this.usedImplementation) {
      case 'simple-array':
        {
          instance.value = NULL;
          this.setActiveElement(instance);
          this.tailPosition = this.elements[this.tailPosition - 1] ? this.tailPosition - 1 : this.elements.length-1;
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
              this.arrowElements[this.arrowElements.length - 1].destroy();
              this.arrowElements = this.arrowElements.slice(0, this.arrowElements.length - 1);
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
            this.createStack()
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
