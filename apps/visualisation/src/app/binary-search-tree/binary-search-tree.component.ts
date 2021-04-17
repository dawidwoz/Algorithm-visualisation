import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { ElementComponent } from '@major-project/common';

const NULL = 'null';

@Component({
  selector: 'major-project-binary-search-tree',
  templateUrl: './binary-search-tree.component.html',
  styleUrls: ['./binary-search-tree.component.scss']
})
export class BinarySearchTreeComponent implements OnInit {
  @ViewChild('animationArea', { static: true, read: ViewContainerRef })
  animationArea: ViewContainerRef;
  @ViewChild('size', { static: true, read: ViewContainerRef }) sizeInput: ViewContainerRef;
  @ViewChild('remove', { static: true, read: ViewContainerRef }) removeInput: ViewContainerRef;
  @ViewChild('result', { static: true, read: ViewContainerRef }) resultInput: ViewContainerRef;
  @ViewChild('search', { static: true, read: ViewContainerRef }) searchInput: ViewContainerRef;
  @ViewChild('newElement', { static: true, read: ViewContainerRef })
  newElementInput: ViewContainerRef;

  public implementation?: string;
  public elements: ComponentRef<ElementComponent>[] = [];
  public usedImplementation?: string;
  public randomNumber: number = 0;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    protected readonly target: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.randomNumber = Math.floor(3 + Math.random() * 7);
  }

  setImplementation(implementation: string): void {
    this.implementation = implementation;
  }

  createHashFunction(): void {
    this.usedImplementation = this.implementation;
    this.animationArea.clear();
    this.elements = [];
    switch (this.usedImplementation) {
      case 'separate-chaining':
      case 'linear-probing':
        this.createArrayImplementation();
        break;
    }
  }

  createArrayImplementation(): void {
    const size =
      this.sizeInput.element.nativeElement.value !== ''
        ? this.sizeInput.element.nativeElement.value
        : (this.sizeInput.element.nativeElement.value = 5);
    for (let i = 0; i < size; i++) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        ElementComponent
      );
      const componentRef = this.animationArea.createComponent<ElementComponent>(
        componentFactory
      );
      componentRef.instance.number = i;
      componentRef.instance.value = NULL;
      componentRef.instance.active = true;
      this.elements.push(componentRef);
    }
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

  addElement(value: string, keepCurrentActive: boolean = false): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      ElementComponent
    );
    const componentRef = this.animationArea.createComponent<ElementComponent>(
      componentFactory
    );
    componentRef.instance.number = this.elements.length;
    componentRef.instance.value = value;
    this.elements.push(componentRef);
    this.setActiveElement(componentRef.instance, keepCurrentActive);
  }

  pushElement(): void {
    let value = this.newElementInput.element.nativeElement.value;
    if (value === '') return;
    value = parseInt(value);
    value = value > 999 ? 999 : value;
    switch (this.usedImplementation) {
      case 'separate-chaining':
        this.pushSeparateChaining(value);
        break;
      case 'linear-probing':
        this.pushLinearProbing(value);
        break;
    }
  }

  pushLinearProbing(value: number): void {
    const place = value % this.randomNumber;
    for (let i = place; i < this.elements.length; i++) {
      const element = this.elements[i].instance;
      if (element.value === NULL) {
        element.value = value.toString();
        this.setActiveElement(element);
        return;
      }
    }
    for (let j = 0; j < place; j++) {
      const element = this.elements[j].instance;
      if (element.value === NULL) {
        element.value = value.toString();
        this.setActiveElement(element);
        return;
      }
    }
    this.resultInput.element.nativeElement.innerHTML = 'Array is full!';
  }

  pushSeparateChaining(value: number): void {
    let place = value % this.randomNumber;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (this.elements[place] === undefined) {
        break;
      }
      if (this.elements[place].instance.value === NULL) {
        break;
      }
      place = place + this.randomNumber;
    }
    for (let i = this.elements.length; i < place + 1; i++) {
      this.addElement('null', false);
    }
    const element = this.elements[place].instance;
    if (element.value === NULL) {
      element.value = value.toString();
      this.setActiveElement(element);
    }
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
    if(!element) return;
    let place = element % this.randomNumber;
    switch (this.usedImplementation) {
      case 'separate-chaining':
        // eslint-disable-next-line no-constant-condition
        while (true) {
          if (this.elements[place] === undefined) {
            break;
          }
          if (this.elements[place].instance.value === element.toString()) {
            this.setActiveElement(this.elements[place].instance);
            if (removeElement) {
              this.elements[place].instance.value = 'null';
            }
            return;
          }
          place = place + this.randomNumber;
        }
        this.resultInput.element.nativeElement.innerHTML = 'Not found in the array!';
        break;
      case 'linear-probing':
        for (let i = place; i < this.elements.length; i++) {
          const elementInstance = this.elements[i].instance;
          if (elementInstance.value === element.toString()) {
            if (removeElement) {
              elementInstance.value = 'null';
            }
            this.setActiveElement(elementInstance);
            return;
          }
        }
        for (let j = 0; j < place; j++) {
          const elementInstance = this.elements[j].instance;
          if (elementInstance.value === element.toString()) {
            if (removeElement) {
              elementInstance.value = 'null';
            }
            this.setActiveElement(elementInstance);
            return;
          }
        }
        this.resultInput.element.nativeElement.innerHTML = 'Not found in the array!';
        break;
    }
  }
}