import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { MatSlider } from '@angular/material/slider';
import {
  ElementComponent,
  ArrowComponent,
  ElementWrapperComponent,
  NULL,
  setActiveElement
} from '@major-project/common';
import {
  dequeueStepsQueueArray,
  dequeueStepsQueueList,
  dequeueQueueTitle,
  enqueueStepsQueueArray,
  enqueueStepsQueueList,
  enqueueQueueTitle,
  peekStepsQueueArray,
  peekStepsQueueList,
  peekQueueTitle
} from '../descriptions/steps';

@Component({
  selector: 'major-project-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent {
  @ViewChild('animationArea', { static: true, read: ViewContainerRef })
  animationArea: ViewContainerRef;
  @ViewChild('size', { static: true, read: ViewContainerRef }) sizeInput: ViewContainerRef;
  @ViewChild('animationSpeed', { static: true, read: MatSlider })
  animationSpeedInput: MatSlider;
  @ViewChild('result', { static: true, read: ViewContainerRef }) result: ViewContainerRef;
  @ViewChild('newElement', { static: true, read: ViewContainerRef })
  newElementInput: ViewContainerRef;

  public currentTitle: string;
  public currentSteps: string[] | undefined;
  public actualStep: number = 0;

  public implementation?: string;
  public elements: ComponentRef<ElementComponent>[] = [];
  public arrowElements: ComponentRef<ArrowComponent>[] = [];
  public usedImplementation?: string;
  public inProgress: boolean = false;
  public headPosition: number = 0;
  public tailPosition: number = 0;

  constructor(
    protected readonly componentFactoryResolver: ComponentFactoryResolver,
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
    this.currentSteps = undefined;
    this.currentTitle = undefined;
    this.elements = [];
    this.arrowElements = [];
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
      const componentRef = this.animationArea.createComponent<ElementComponent>(componentFactory);
      componentRef.instance.time = this.animationSpeedInput.value;
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

  setArrowDirection(): void {
    const arrowLength = this.arrowElements.length;
    if (1 > arrowLength) return;
    for (const arrowElement of this.arrowElements) {
      const arrowInstance = arrowElement.instance;
      arrowInstance.time = this.animationSpeedInput.value;
      if (arrowInstance === this.arrowElements[arrowLength - 1].instance) {
        if (arrowInstance.direction === 'right') {
          arrowInstance.direction = 'left';
          arrowInstance.triggerEnterAnimation();
        }
      } else if (arrowInstance.direction === 'left') {
        arrowInstance.direction = 'right';
        arrowInstance.triggerEnterAnimation();
      }
    }
  }

  addArrow(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ArrowComponent);
    const componentRef = this.animationArea.createComponent<ArrowComponent>(componentFactory);
    componentRef.instance.time = this.animationSpeedInput.value;
    this.arrowElements.push(componentRef);
    this.setArrowDirection();
  }

  addElement(value: string, keepCurrentActive: boolean = false): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      ElementComponent
    );
    const componentRef = this.animationArea.createComponent<ElementComponent>(componentFactory);
    componentRef.instance.time = this.animationSpeedInput.value;
    componentRef.instance.value = value;
    this.elements.push(componentRef);
    setActiveElement(this.elements, componentRef.instance, keepCurrentActive);
  }

  enqueueQueue(): void {
    let value = this.newElementInput.element.nativeElement.value;
    if (value === '') return;
    value = parseInt(value);
    value = value > 999 ? 999 : value;
    value = 1 > value ? 1 : value;
    this.newElementInput.element.nativeElement.value = value;
    this.currentTitle = enqueueQueueTitle;
    this.actualStep = 1;
    switch (this.usedImplementation) {
      case 'simple-array':
        this.currentSteps = enqueueStepsQueueArray;
        this.pushArrayImplementation(value);
        break;
      case 'singly-linked-list':
        this.currentSteps = enqueueStepsQueueList;
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
    setActiveElement(this.elements, undefined, false);
    for (const value of values) {
      const localComponentRef = componentRef.instance.addComponent<ElementComponent>(ElementComponent);
      localComponentRef.instance.value = value;
      localComponentRef.instance.time = this.animationSpeedInput.value;
      localComponentRef.instance.active = true;
      addElements.push(localComponentRef);
    }
    this.elements = this.elements.concat(addElements.reverse());
  }

  pushListImplementation(value: string): void {
    for (const element of this.elements) {
      element.instance.time = this.animationSpeedInput.value;
      if (element.instance.value === 'NULL') {
        element.destroy();
        this.elements = this.elements.filter(item => item.instance != element.instance);
        this.arrowElements.pop().destroy();
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
        instance.time = this.animationSpeedInput.value;
        instance.triggerEnterAnimation();
        this.tailPosition = this.elements[this.tailPosition + 1] ? this.tailPosition + 1 : 0;
        setActiveElement(this.elements, instance);
        this.setHeadTail();
        this.actualStep = 2;
        return;
      }
    }
    this.result.element.nativeElement.value = 'Queue is full!';
    this.actualStep = 3;
  }

  async peek(): Promise<void> {
    this.currentTitle = peekQueueTitle;
    this.actualStep = 1;
    switch (this.usedImplementation) {
      case 'simple-array':
        this.currentSteps = peekStepsQueueArray;
        break;
      case 'singly-linked-list':
        this.currentSteps = peekStepsQueueList;
        break;
    }
    await this.lastElement(false);
  }

  async dequeue(): Promise<void> {
    this.currentTitle = dequeueQueueTitle;
    this.actualStep = 1;
    switch (this.usedImplementation) {
      case 'simple-array':
        this.currentSteps = dequeueStepsQueueArray;
        break;
      case 'singly-linked-list':
        this.currentSteps = dequeueStepsQueueList;
        break;
    }
    await this.lastElement(true);
  }

  async lastElement(removeElement: boolean): Promise<void> {
    switch (this.usedImplementation) {
      case 'simple-array':
        {
          const headInstance = this.elements[this.headPosition].instance;
          for (const element of this.elements) {
            const instance = element.instance;
            if (instance.value !== NULL && instance === headInstance) {
              this.result.element.nativeElement.value = instance.value;
              instance.time = this.animationSpeedInput.value;
              this.actualStep = 3;
              if (removeElement) {
                this.inProgress = true;
                await this.removeElement(instance).then(() => (this.inProgress = false));
                this.actualStep = 4;
              }
              return;
            }
          }
        }
        break;
      case 'singly-linked-list':
        {
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
              instance.time = this.animationSpeedInput.value;
              this.actualStep = 3;
              if (removeElement) {
                this.inProgress = true;
                await this.removeElement(instance).then(() => (this.inProgress = false));
              }
              return;
            }
          }
        }
        break;
    }
    this.result.element.nativeElement.value = 'Queue is empty!';
    this.actualStep = 2;
  }

  async removeElement(instance: ElementComponent): Promise<void> {
    switch (this.usedImplementation) {
      case 'simple-array':
        {
          instance.value = NULL;
          instance.time = this.animationSpeedInput.value;
          this.headPosition = this.elements[this.headPosition + 1] ? this.headPosition + 1 : 0;
          setActiveElement(this.elements, instance);
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
            stackElement.instance.time = this.animationSpeedInput.value;
            stackElement.instance.triggerExitAnimation();
            await new Promise<boolean>(resolve =>
              setTimeout(() => {
                stackElement.destroy();
                resolve(true);
              }, this.animationSpeedInput.value)
            );
            if (!isArrowRemoved) {
              this.arrowElements[0].instance.time = this.animationSpeedInput.value;
              this.arrowElements[0].instance.triggerExitAnimation();

              await new Promise<boolean>(resolve =>
                setTimeout(() => {
                  this.arrowElements[0].destroy();
                  resolve(true);
                }, this.animationSpeedInput.value)
              );
              this.arrowElements.shift();
              isArrowRemoved = true;
            }
          }
          this.elements = this.elements.slice(i, this.elements.length);
          const currentElement = this.elements[0].instance;
          currentElement.time = this.animationSpeedInput.value;
          currentElement.triggerEnterAnimation();
          currentElement.value = 'head';
          setActiveElement(this.elements, currentElement);
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
