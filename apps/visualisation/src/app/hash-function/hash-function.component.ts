import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {
  ElementComponent,
  ElementWrapperComponent,
  EmptySign,
  NULL,
  setActiveElement
} from '@major-project/common';
import {
  insertHashFunction,
  insertHashFunctionLinearProbingSteps,
  removeHashFunction,
  removeHashFunctionLinearProbingSteps,
  searchHashFunction,
  searchHashFunctionLinearProbingSteps
} from '@major-project/hash-function';

@Component({
  selector: 'major-project-hash-function',
  templateUrl: './hash-function.component.html',
  styleUrls: ['./hash-function.component.scss']
})
export class HashFunctionComponent {
  @ViewChild('animationArea', { static: true, read: ViewContainerRef })
  animationArea: ViewContainerRef;
  @ViewChild('size', { static: true, read: ViewContainerRef }) sizeInput: ViewContainerRef;
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
      const componentRefElement = componentRefWrapper.instance.addComponent(ElementComponent, true);
      componentRefElement.instance.number = i;
      componentRefElement.instance.value = NULL;
      componentRefElement.instance.active = true;
      const componentRefElement2 = componentRefWrapper.instance.addComponent(ElementComponent, true);
      componentRefElement2.instance.value = NULL;
      componentRefElement2.instance.active = true;
      
      this.elementsSeparateChaining.push(componentRefWrapper);
    }
    console.log(this.elementsSeparateChaining);
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
      this.elementsLinear.push(componentRef);
    }
  }

  setActiveElement(instance: ElementComponent, keepCurrent: boolean = false): void {
    for (const element of this.elementsLinear) {
      const currentInstance = element.instance;
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
      if (element.value === NULL) {
        element.value = value.toString();
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
      if (element.value === NULL) {
        element.value = value.toString();
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
    let place = value % this.randomNumber;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (this.elementsLinear[place] === undefined) {
        break;
      }
      if (this.elementsLinear[place].instance.value === NULL) {
        break;
      }
      place = place + this.randomNumber;
    }
    for (let i = this.elementsLinear.length; i < place + 1; i++) {
      this.addElement('null', false);
    }
    const element = this.elementsLinear[place].instance;
    if (element.value === NULL) {
      element.value = value.toString();
      setActiveElement(this.elementsLinear, element);
    }
  }

  performSearch(): void {
    this.actualStep = 1;
    this.currentTitle = searchHashFunction;
    this.currentSteps = searchHashFunctionLinearProbingSteps;
    this.getElement(false);
  }

  performRemove(): void {
    this.actualStep = 1;
    this.currentTitle = removeHashFunction;
    this.currentSteps = removeHashFunctionLinearProbingSteps;
    this.getElement(true);
  }

  getElement(removeElement: boolean): void {
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
    let place = element % this.randomNumber;
    switch (this.usedImplementation) {
      case 'separate-chaining':
        // eslint-disable-next-line no-constant-condition
        while (true) {
          if (this.elementsLinear[place] === undefined) {
            break;
          }
          if (this.elementsLinear[place].instance.value === element.toString()) {
            setActiveElement(this.elementsLinear, this.elementsLinear[place].instance);
            if (removeElement) {
              this.elementsLinear[place].instance.value = 'null';
            }
            return;
          }
          place = place + this.randomNumber;
        }
        this.resultInput.element.nativeElement.innerHTML = 'Not found in the array!';
        break;
      case 'linear-probing':
        for (let i = place; i < this.elementsLinear.length; i++) {
          const elementInstance = this.elementsLinear[i].instance;
          if (elementInstance.value === element.toString()) {
            if (removeElement) {
              elementInstance.value = EmptySign;
            }
            this.actualStep = 3;
            setActiveElement(this.elementsLinear, elementInstance);
            return;
          }
        }
        for (let j = 0; j < place; j++) {
          const elementInstance = this.elementsLinear[j].instance;
          if (elementInstance.value === element.toString()) {
            if (removeElement) {
              elementInstance.value = EmptySign;
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
