import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnInit,
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
export class StackComponent implements OnInit {
  @ViewChild('animationArea', { static: true, read: ViewContainerRef })
  animationArea: ViewContainerRef;
  @ViewChild('size', { static: true, read: ViewContainerRef }) sizeInput: ViewContainerRef;
  @ViewChild('result', { static: true, read: ViewContainerRef }) result: ViewContainerRef;
  @ViewChild('newElement', { static: true, read: ViewContainerRef })
  newElementInput: ViewContainerRef;

  public implementation?: string;
  public stackElements: ComponentRef<StackElementComponent>[] = [];
  public arrowElements: ComponentRef<ArrowComponent>[] = [];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    protected readonly target: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.listImplementation();
    this.implementation = 'singly-linked-list';
  }

  setImplementation(implementation: string): void {
    this.implementation = implementation;
    if (this.implementation === 'singly-linked-list') {
      this.sizeInput.element.nativeElement.value = '';
    }
  }

  createStack(): void {
    this.animationArea.clear();
    this.stackElements = [];
    switch (this.implementation) {
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
    this.addStackElement('tail');
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
      componentRef.instance.number = i;
      componentRef.instance.value = NULL;
      this.stackElements.push(componentRef);
    }
  }

  addArrow(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ArrowComponent);
    const componentRef = this.animationArea.createComponent<ArrowComponent>(componentFactory);
    this.arrowElements.push(componentRef);
  }

  addStackElement(value: string): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      StackElementComponent
    );
    const componentRef = this.animationArea.createComponent<StackElementComponent>(
      componentFactory
    );
    componentRef.instance.value = value;
    this.stackElements.push(componentRef);
  }

  pushStack(): void {
    const value = this.newElementInput.element.nativeElement.value;
    if (value === '') return;
    console.log(this.implementation);
    switch (this.implementation) {
      case 'simple-array':
        this.pushArrayImplementation(value);
        break;
      case 'singly-linked-list':
        this.pushListImplementation(value);
        break;
    }
  }

  pushListImplementation(value: string): void {
    this.stackElements[this.stackElements.length - 1].instance.value = value;
    this.addStackElement('next');
    this.addArrow();
    this.addStackElement('tail');
  }

  pushArrayImplementation(value: string): void {
    for (const stackElement of this.stackElements) {
      const instance = stackElement.instance;
      if (instance.value === NULL) {
        instance.value = value;
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
        instance.value !== 'head'
      ) {
        this.result.element.nativeElement.innerHTML = instance.value;
        if (removeElement) {
          this.removeElement(instance);
        }
        return;
      }
    }
    this.result.element.nativeElement.innerHTML = 'Stack is empty!';
  }

  removeElement(instance: StackElementComponent): void {
    switch (this.implementation) {
      case 'simple-array':
        instance.value = NULL;
        break;
      case 'singly-linked-list':
        {
          instance.value = 'tail';
          for (let i = this.stackElements.length-1; i != 0 ; i--) {
            const stackElement = this.stackElements[i];
            if (stackElement.instance === instance) break;
            stackElement.destroy();
            this.stackElements = this.stackElements.slice(0, i);
          }
          this.arrowElements[this.arrowElements.length - 1].destroy();
          this.arrowElements = this.arrowElements.slice(0, this.arrowElements.length - 1);
          console.log(this.arrowElements);
        }
        break;
    }
  }
}
