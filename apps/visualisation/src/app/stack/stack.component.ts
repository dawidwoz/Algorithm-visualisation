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
  public stackElements: ComponentRef<StackElementComponent>[] = [];
  public arrowElements: ComponentRef<ArrowComponent>[] = [];
  public usedImplementation?: string;
  public inProgress: boolean = false;

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
    this.stackElements = [];
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
    this.addStackElement('head');
    this.addArrow();
    this.addStackElement('NULL', true);
    this.addArrow();
    this.addStackElement('tail', true);
  }

  arrayImplementation(): void {
    const size =
      this.sizeInput.element.nativeElement.value !== ''
        ? this.sizeInput.element.nativeElement.value
        : (this.sizeInput.element.nativeElement.value = 5);
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
      this.stackElements.push(componentRef);
    }
  }

  setActiveElement(instance: StackElementComponent, keepCurrent: boolean = false): void {
    console.log(this.stackElements);
    for (const stackElement of this.stackElements) {
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

  addStackElement(value: string, keepCurrentActive: boolean = false): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      StackElementComponent
    );
    const componentRef = this.animationArea.createComponent<StackElementComponent>(
      componentFactory
    );
    componentRef.instance.time = this.animationSpeedInput.element.nativeElement.value;
    componentRef.instance.value = value;
    this.stackElements.push(componentRef);
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
    for(const stackElement of this.stackElements) {
      if (stackElement.instance.value === 'NULL') {
        stackElement.destroy();
        this.stackElements = this.stackElements.filter(item => item.instance != stackElement.instance);
        this.arrowElements[this.arrowElements.length-1].destroy();
      }
    }

    this.stackElements[this.stackElements.length - 1].destroy();
    this.stackElements = this.stackElements.slice(0, this.stackElements.length - 1);
    this.addStackElement(value);
    this.addStackElement('next', true);
    this.addArrow();
    this.addStackElement('tail', true);
  }

  pushArrayImplementation(value: string): void {
    for (const stackElement of this.stackElements) {
      const instance = stackElement.instance;
      if (instance.value === NULL) {
        instance.value = value;
        instance.triggerEnterAnimation();
        this.setActiveElement(instance);
        return;
      }
    }
    this.result.element.nativeElement.innerHTML = 'Stack is full!';
  }

  lastElementStack(removeElement: boolean): void {
    const reverse = [...this.stackElements];
    for (const stackElement of reverse.reverse()) {
      const instance = stackElement.instance;
      if (
        instance.value !== NULL &&
        instance.value !== 'tail' &&
        instance.value !== 'next' &&
        instance.value !== 'head' &&
        instance.value !== 'NULL'
      ) {
        this.result.element.nativeElement.innerHTML = instance.value;
        if (removeElement) {
          this.inProgress = true;
          this.removeElement(instance).then(() => (this.inProgress = false));
        }
        return;
      }
    }
    this.result.element.nativeElement.innerHTML = 'Stack is empty!';
  }

  async removeElement(instance: StackElementComponent): Promise<void> {
    switch (this.usedImplementation) {
      case 'simple-array':
        {
          instance.value = NULL;
          this.setActiveElement(instance);
          instance.triggerEnterAnimation();
        }
        break;
      case 'singly-linked-list':
        {
          let isArrowRemoved = false;
          for (let i = this.stackElements.length - 1; i != 0; i--) {
            const stackElement = this.stackElements[i];
            if (stackElement.instance === instance) break;
            stackElement.instance.triggerExitAnimation();
            await new Promise<boolean>(resolve =>
              setTimeout(() => {
                stackElement.destroy();
                resolve(true);
              }, 1500)
            );
            this.stackElements = this.stackElements.slice(0, i);
            if (!isArrowRemoved) {
              this.arrowElements[this.arrowElements.length - 1].destroy();
              this.arrowElements = this.arrowElements.slice(0, this.arrowElements.length - 1);
              isArrowRemoved = true;
            }
          }
          instance.triggerEnterAnimation();
          instance.value = 'tail';
          this.setActiveElement(instance);
          if (this.stackElements.length == 2) {
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
