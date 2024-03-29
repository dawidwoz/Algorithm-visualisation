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
  EmptySign,
  NULL,
  setActiveElement
} from '@major-project/common';
import {
  insertHashFunction,
  insertHashFunctionLinearProbingSteps,
  insertHashFunctionSeparateChainingSteps,
  removeHashFunction,
  removeHashFunctionLinearProbingSteps,
  removeHashFunctionSeparateChainingSteps,
  searchHashFunction,
  searchHashFunctionLinearProbingSteps,
  searchHashFunctionSeparateChainingSteps
} from '../descriptions/steps';

@Component({
  selector: 'major-project-hash-function',
  templateUrl: './hash-function.component.html',
  styleUrls: ['./hash-function.component.scss']
})
export class HashFunctionComponent {
  @ViewChild('animationArea', { static: true, read: ViewContainerRef })
  animationArea: ViewContainerRef;
  @ViewChild('size', { static: true, read: ViewContainerRef }) sizeInput: ViewContainerRef;
  @ViewChild('animationSpeed', { static: true, read: MatSlider })
  animationSpeedInput: MatSlider;
  @ViewChild('remove', { static: true, read: ViewContainerRef }) removeInput: ViewContainerRef;
  @ViewChild('result', { static: true, read: ViewContainerRef }) resultInput: ViewContainerRef;
  @ViewChild('search', { static: true, read: ViewContainerRef }) searchInput: ViewContainerRef;
  @ViewChild('newElement', { static: true, read: ViewContainerRef })
  newElementInput: ViewContainerRef;

  public currentTitle: string;
  public currentSteps: string[] | undefined;
  public actualStep: number = 0;

  public implementation?: string;
  public elementsLinear: ComponentRef<ElementComponent>[] = [];
  public elementsSeparateChaining: ComponentRef<ElementWrapperComponent>[] = [];
  public usedImplementation?: string;
  public randomNumber: number = 0;

  constructor(
    protected readonly componentFactoryResolver: ComponentFactoryResolver,
    protected readonly target: ViewContainerRef
  ) {}

  setImplementation(implementation: string): void {
    this.implementation = implementation;
  }

  createHashFunction(): void {
    this.usedImplementation = this.implementation;
    this.animationArea.clear();
    this.elementsLinear = [];
    this.elementsSeparateChaining = [];
    this.currentSteps = undefined;
    const size =
      this.sizeInput.element.nativeElement.value !== ''
        ? this.sizeInput.element.nativeElement.value
        : (this.sizeInput.element.nativeElement.value = 5);
    this.randomNumber = size;
    switch (this.usedImplementation) {
      case 'separate-chaining':
        this.createSeparateChaining();
        break;
      case 'linear-probing':
        this.createArrayImplementation();
        break;
    }
  }

  createSeparateChaining(): void {
    for (let i = 0; i < this.randomNumber; i++) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        ElementWrapperComponent
      );
      const componentRefWrapper = this.animationArea.createComponent<ElementWrapperComponent>(
        componentFactory
      );
      componentRefWrapper.instance.noReverse = true;
      const componentRefElement = componentRefWrapper.instance.addComponent(ElementComponent);
      componentRefElement.instance.value = i.toString();
      componentRefElement.instance.time = this.animationSpeedInput.value;
      componentRefElement.instance.active = false;

      this.elementsSeparateChaining.push(componentRefWrapper);
    }
  }

  createArrayImplementation(): void {
    for (let i = 0; i < this.randomNumber; i++) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        ElementComponent
      );
      const componentRef = this.animationArea.createComponent<ElementComponent>(componentFactory);
      componentRef.instance.number = i;
      componentRef.instance.value = NULL;
      componentRef.instance.active = true;
      componentRef.instance.time = this.animationSpeedInput.value;
      this.elementsLinear.push(componentRef);
    }
  }

  setActiveElement(instance: ElementComponent, keepCurrent: boolean = false): void {
    for (const element of this.elementsLinear) {
      const currentInstance = element.instance;
      currentInstance.time = this.animationSpeedInput.value;
      if (currentInstance === instance) {
        currentInstance.active = true;
      } else if (!keepCurrent) {
        currentInstance.active = false;
      }
    }
  }

  addElement(value: string, keepCurrentActive: boolean = false): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      ElementComponent
    );
    const componentRef = this.animationArea.createComponent<ElementComponent>(componentFactory);
    componentRef.instance.number = this.elementsLinear.length;
    componentRef.instance.value = value;
    componentRef.instance.time = this.animationSpeedInput.value;
    this.elementsLinear.push(componentRef);
    setActiveElement(this.elementsLinear, componentRef.instance, keepCurrentActive);
  }

  pushElement(): void {
    let value = this.newElementInput.element.nativeElement.value;
    if (value === '') return;
    value = parseInt(value);
    value = value > 999 ? 999 : value;
    value = 1 > value ? 1 : value;
    this.newElementInput.element.nativeElement.value = value;
    this.resultInput.element.nativeElement.innerHTML = '';
    this.actualStep = 1;
    this.currentTitle = insertHashFunction;
    switch (this.usedImplementation) {
      case 'separate-chaining':
        this.currentSteps = insertHashFunctionSeparateChainingSteps;
        this.pushSeparateChaining(value);
        break;
      case 'linear-probing':
        this.currentSteps = insertHashFunctionLinearProbingSteps;
        this.pushLinearProbing(value);
        break;
    }
  }

  pushLinearProbing(value: number): void {
    const place = value % this.randomNumber;
    for (let i = place; i < this.elementsLinear.length; i++) {
      const element = this.elementsLinear[i].instance;
      element.time = this.animationSpeedInput.value;
      if (element.value === NULL || element.value === EmptySign) {
        element.value = value.toString();
        element.triggerEnterAnimation();
        setActiveElement(this.elementsLinear, element);
        this.actualStep = 2;
        return;
      }
      if (element.value === value.toString()) {
        this.actualStep = 3;
        this.resultInput.element.nativeElement.innerHTML = 'Element already in the array!';
        return;
      }
    }
    for (let j = 0; j < place; j++) {
      const element = this.elementsLinear[j].instance;
      element.time = this.animationSpeedInput.value;
      if (element.value === NULL || element.value === EmptySign) {
        element.value = value.toString();
        element.triggerEnterAnimation();
        setActiveElement(this.elementsLinear, element);
        this.actualStep = 2;
        return;
      }
      if (element.value === value.toString()) {
        this.actualStep = 3;
        this.resultInput.element.nativeElement.innerHTML = 'Element already in the array!';
        return;
      }
    }
    this.resultInput.element.nativeElement.innerHTML = 'Array is full!';
    this.actualStep = 4;
  }

  pushSeparateChaining(value: number): void {
    const place = value % this.randomNumber;
    let isInArray = false;
    const element = this.elementsSeparateChaining[place].instance;
    this.actualStep = 2;
    element.elements.forEach(elem => {
      elem.instance.active = false;
      elem.instance.time = this.animationSpeedInput.value;
      if (elem.instance.value == value) {
        isInArray = true;
        elem.instance.active = true;
        return;
      }
    });
    if (!isInArray) {
      const arrayComponentRef = element.addComponent(ArrowComponent, true);
      arrayComponentRef.instance.time = this.animationSpeedInput.value;
      const componentRef = this.elementsSeparateChaining[place].instance.addComponent(
        ElementComponent,
        true
      );
      componentRef.instance.time = this.animationSpeedInput.value;
      componentRef.instance.value = value.toString();
      componentRef.instance.active = true;
      componentRef.instance.triggerEnterAnimation();
      this.actualStep = 4;
    } else {
      this.actualStep = 3;
      this.resultInput.element.nativeElement.innerHTML = 'Element already in the array!';
    }
  }

  performSearch(): void {
    this.actualStep = 1;
    this.currentTitle = searchHashFunction;
    switch (this.usedImplementation) {
      case 'separate-chaining':
        this.currentSteps = searchHashFunctionSeparateChainingSteps;
        break;
      case 'linear-probing':
        this.currentSteps = searchHashFunctionLinearProbingSteps;
        break;
    }
    this.getElement(false);
  }

  performRemove(): void {
    this.actualStep = 1;
    this.currentTitle = removeHashFunction;
    switch (this.usedImplementation) {
      case 'separate-chaining':
        this.currentSteps = removeHashFunctionSeparateChainingSteps;
        break;
      case 'linear-probing':
        this.currentSteps = removeHashFunctionLinearProbingSteps;
        break;
    }
    this.getElement(true);
  }

  async getElement(removeElement: boolean): Promise<void> {
    let element = 0;
    this.resultInput.element.nativeElement.innerHTML = '';
    if (removeElement) {
      element =
        this.removeInput.element.nativeElement.value !== ''
          ? this.removeInput.element.nativeElement.value
          : null;
    } else {
      element =
        this.searchInput.element.nativeElement.value !== ''
          ? this.searchInput.element.nativeElement.value
          : null;
    }
    if (!element) return;
    const place = element % this.randomNumber;
    let found = false;
    switch (this.usedImplementation) {
      case 'separate-chaining':
        this.actualStep = 2;
        for (let i = 0; i < this.elementsSeparateChaining.length; i++) {
          const elemWrapper = this.elementsSeparateChaining[i].instance;
          for (let j = 0; j < elemWrapper.elements.length; j++) {
            const instance = elemWrapper.elements[j].instance;
            instance.active = false;
            instance.time = this.animationSpeedInput.value;
            this.actualStep = 4;
            if (i == place && instance.value === element) {
              instance.active = true;
              instance.time = this.animationSpeedInput.value;
              found = true;
              this.actualStep = 3;
              if (removeElement) {
                elemWrapper.elements[j - 1].instance.triggerExitAnimation();
                await new Promise<boolean>(resolve =>
                  setTimeout(() => {
                    elemWrapper.elements[j - 1].destroy();
                    resolve(true);
                  }, this.animationSpeedInput.value)
                );
                elemWrapper.elements[j].instance.triggerExitAnimation();
                await new Promise<boolean>(resolve =>
                  setTimeout(() => {
                    elemWrapper.elements[j].destroy();
                    resolve(true);
                  }, this.animationSpeedInput.value)
                );
                elemWrapper.elements.splice(j - 1, 2);
              }
            }
          }
        }
        if (!found) {
          this.actualStep = 5;
          this.resultInput.element.nativeElement.innerHTML = 'Not found in the array!';
        }
        break;
      case 'linear-probing':
        for (let i = place; i < this.elementsLinear.length; i++) {
          const elementInstance = this.elementsLinear[i].instance;
          elementInstance.time = this.animationSpeedInput.value;
          if (elementInstance.value === element.toString()) {
            if (removeElement) {
              elementInstance.value = EmptySign;
              elementInstance.triggerEnterAnimation();
            }
            this.actualStep = 3;
            setActiveElement(this.elementsLinear, elementInstance);
            return;
          }
        }
        for (let j = 0; j < place; j++) {
          const elementInstance = this.elementsLinear[j].instance;
          elementInstance.time = this.animationSpeedInput.value;
          if (elementInstance.value === element.toString()) {
            if (removeElement) {
              elementInstance.value = EmptySign;
              elementInstance.triggerEnterAnimation();
            }
            this.actualStep = 3;
            setActiveElement(this.elementsLinear, elementInstance);
            return;
          }
        }
        this.resultInput.element.nativeElement.innerHTML = 'Not found in the array!';
        this.actualStep = 5;
        break;
    }
  }
}
