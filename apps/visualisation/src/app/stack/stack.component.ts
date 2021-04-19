import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { MatSlider } from '@angular/material/slider';
import {
  ArrowComponent,
  ElementComponent,
  ElementWrapperComponent,
  NULL,
  setActiveElement
} from '@major-project/common';
import {
  peekStepsArray,
  peekStepsList,
  peekStepTitle,
  popStepsArray,
  popStepsList,
  popStepTitle,
  pushStepsArray,
  pushStepsList,
  pushStepTitle
} from '@major-project/stack';

@Component({
  selector: 'major-project-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.scss']
})
export class StackComponent {
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
  public topPosition: number = 0;

  constructor(
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private readonly viewContainerRef: ViewContainerRef
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
    this.viewContainerRef.clear();
    this.elements = [];
    this.arrowElements = [];
    this.currentSteps = undefined;
    this.currentTitle = undefined;
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
    this.addElement('head', true);
  }

  arrayImplementation(): void {
    const size =
      this.sizeInput.element.nativeElement.value !== ''
        ? this.sizeInput.element.nativeElement.value
        : (this.sizeInput.element.nativeElement.value = 5);
    this.topPosition = 0;
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
    this.setTopPosition();
  }

  setTopPosition(): void {
    this.elements.forEach(element => {
      element.instance.texts = [];
      element.instance.badgeExtraMargin = false;
    });
    if (this.elements.length === this.topPosition) {
      this.topPosition--;
      this.elements[this.topPosition].instance.badgeExtraMargin = true;
    }
    this.elements[this.topPosition].instance.texts = ['top'];
  }

  setArrowDirection(): void {
    const arrowLength = this.arrowElements.length;
    if (1 > arrowLength) return;
    for (const arrowElement of this.arrowElements) {
      const arrowInstance = arrowElement.instance;
      if (arrowInstance === this.arrowElements[0].instance) {
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
    const componentRef = this.viewContainerRef.createComponent<ArrowComponent>(componentFactory);
    componentRef.instance.time = this.animationSpeedInput.value;
    componentRef.instance.triggerEnterAnimation();
    const triggerElement = componentRef.location.nativeElement;
    this.animationArea.element.nativeElement.parentNode.prepend(triggerElement);
    this.arrowElements.push(componentRef);
    this.setArrowDirection();
  }

  addElement(value: string, keepCurrentActive: boolean = false): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      ElementComponent
    );
    const componentRef = this.viewContainerRef.createComponent<ElementComponent>(componentFactory);
    componentRef.instance.time = this.animationSpeedInput.value;
    componentRef.instance.value = value;
    const triggerElement = componentRef.location.nativeElement;
    this.animationArea.element.nativeElement.parentNode.prepend(triggerElement);
    this.elements.splice(0, 0, componentRef);
    setActiveElement(this.elements, componentRef.instance, keepCurrentActive);
  }

  addGroupElement(values: string[]): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      ElementWrapperComponent
    );
    const componentRef = this.viewContainerRef.createComponent<ElementWrapperComponent>(
      componentFactory
    );
    const addElements: ComponentRef<ElementComponent>[] = [];
    setActiveElement(this.elements, undefined, false);
    for (const value of values) {
      componentRef.instance.addComponent<ElementComponent>(ElementComponent);
      componentRef.instance.componentRef.instance.value = value;
      componentRef.instance.componentRef.instance.time = this.animationSpeedInput.value;
      componentRef.instance.componentRef.instance.active = true;
      const triggerElement = componentRef.location.nativeElement;
      this.animationArea.element.nativeElement.parentNode.prepend(triggerElement);
      addElements.push(componentRef.instance.componentRef);
    }
    this.elements = addElements.reverse().concat(this.elements);
  }

  async pushStack(): Promise<void> {
    let value = this.newElementInput.element.nativeElement.value;
    if (value === '') return;
    value = parseInt(value);
    value = value > 999 ? 999 : value;
    value = 1 > value ? 1 : value;
    this.newElementInput.element.nativeElement.value = value;
    this.currentTitle = pushStepTitle;
    switch (this.usedImplementation) {
      case 'simple-array':
        this.currentSteps = pushStepsArray;
        await this.pushArrayImplementation(value);
        break;
      case 'singly-linked-list':
        this.currentSteps = pushStepsList;
        this.actualStep = 1;
        this.pushListImplementation(value);
        break;
    }
  }

  pushListImplementation(value: string): void {
    for (const stackElement of this.elements) {
      if (stackElement.instance.value === 'NULL') {
        stackElement.destroy();
        this.elements = this.elements.filter(item => item.instance != stackElement.instance);
        this.arrowElements.pop().destroy();
      }
    }

    this.elements[0].destroy();
    this.elements = this.elements.slice(1, this.elements.length);
    this.addGroupElement(['next', value]);
    this.addArrow();
    this.addElement('head', true);
  }

  async pushArrayImplementation(value: string): Promise<void> {
    await this.animateTopFirstStep();
    for (const stackElement of this.elements) {
      const instance = stackElement.instance;
      if (instance.value === NULL) {
        instance.value = value;
        instance.time = this.animationSpeedInput.value;
        instance.triggerEnterAnimation();
        setActiveElement(this.elements, instance);
        this.topPosition = this.topPosition + 1;
        this.setTopPosition();
        this.actualStep = 2;
        return;
      }
    }
    this.actualStep = 3;
    this.result.element.nativeElement.value = 'Stack is full!';
  }

  async animateTopFirstStep(): Promise<void> {
    this.inProgress = true;
    this.elements[this.topPosition].instance.animation = true;
    this.actualStep = 1;
    await new Promise<boolean>(resolve =>
      setTimeout(() => {
        this.elements[this.topPosition].instance.animation = false;
        resolve(true);
      }, this.animationSpeedInput.value)
    );
    this.inProgress = false;
  }

  async pop(): Promise<void> {
    let elementCopy: ComponentRef<ElementComponent>[];
    if (this.usedImplementation === 'simple-array') {
      elementCopy = [...this.elements].reverse();
      this.currentTitle = popStepTitle;
      this.currentSteps = popStepsArray;
      await this.animateTopFirstStep();
    } else {
      elementCopy = [...this.elements];
      this.currentTitle = popStepTitle;
      this.currentSteps = popStepsList;
      this.actualStep = 1;
    }
    await this.firstElementStack(true, elementCopy);
    if (this.actualStep === 3 && this.usedImplementation === 'simple-array') {
      this.actualStep = 4;
    }
  }

  async peek(): Promise<void> {
    let elementCopy: ComponentRef<ElementComponent>[];
    if (this.usedImplementation === 'simple-array') {
      elementCopy = [...this.elements].reverse();
      this.currentTitle = peekStepTitle;
      this.currentSteps = peekStepsArray;
      await this.animateTopFirstStep();
    } else {
      elementCopy = [...this.elements];
      this.currentTitle = peekStepTitle;
      this.currentSteps = peekStepsList;
      this.actualStep = 1;
    }
    await this.firstElementStack(false, elementCopy);
  }

  async firstElementStack(
    removeElement: boolean,
    elementCopy: ComponentRef<ElementComponent>[]
  ): Promise<void> {
    for (const stackElement of elementCopy) {
      const instance = stackElement.instance;
      if (
        instance.value !== NULL &&
        instance.value !== 'tail' &&
        instance.value !== 'next' &&
        instance.value !== 'head' &&
        instance.value !== 'NULL'
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
    this.result.element.nativeElement.value = 'Stack is empty!';
    this.actualStep = 2;
  }

  async removeElement(instance: ElementComponent): Promise<void> {
    switch (this.usedImplementation) {
      case 'simple-array':
        {
          instance.value = NULL;
          setActiveElement(this.elements, instance);
          this.topPosition = this.elements[this.topPosition - 1] ? this.topPosition - 1 : 0;
          this.setTopPosition();
          instance.triggerEnterAnimation();
        }
        break;
      case 'singly-linked-list':
        {
          this.actualStep = 3;
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
              this.arrowElements[
                this.arrowElements.length - 1
              ].instance.time = this.animationSpeedInput.value;
              this.arrowElements[this.arrowElements.length - 1].instance.triggerExitAnimation();
              await new Promise<boolean>(resolve =>
                setTimeout(() => {
                  this.arrowElements[this.arrowElements.length - 1].destroy();
                  resolve(true);
                }, this.animationSpeedInput.value)
              );
              this.arrowElements = this.arrowElements.slice(0, this.arrowElements.length - 1);
              isArrowRemoved = true;
            }
          }
          this.elements = this.elements.slice(i, this.elements.length);
          const currentElement = this.elements[0].instance;
          currentElement.triggerEnterAnimation();
          currentElement.time = this.animationSpeedInput.value;
          currentElement.value = 'head';
          setActiveElement(this.elements, currentElement);
          if (this.elements.length == 2) {
            this.createStack();
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
