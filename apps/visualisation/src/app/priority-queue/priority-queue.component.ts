import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { StackElementComponent } from '@major-project/stack';
import { BinaryTreeComponent } from '@major-project/common';

const NULL = 'null';

@Component({
  selector: 'major-project-priority-queue',
  templateUrl: './priority-queue.component.html',
  styleUrls: ['./priority-queue.component.scss']
})
export class PriorityQueueComponent {
  @ViewChild('animationArea', { static: true, read: ViewContainerRef })
  animationArea: ViewContainerRef;
  @ViewChild('treeArea', { static: true, read: ViewContainerRef })
  treeArea: ViewContainerRef;
  @ViewChild('size', { static: true, read: ViewContainerRef }) sizeInput: ViewContainerRef;
  @ViewChild('animationSpeed', { static: true, read: ViewContainerRef })
  animationSpeedInput: ViewContainerRef;
  @ViewChild('result', { static: true, read: ViewContainerRef }) result: ViewContainerRef;
  @ViewChild('newElement', { static: true, read: ViewContainerRef })
  newElementInput: ViewContainerRef;

  public implementation?: string;
  public elements: ComponentRef<StackElementComponent>[] = [];
  public binaryTree?: ComponentRef<BinaryTreeComponent>; 
  public values: string[] = [];
  public usedImplementation?: string;
  public addedValue: number = 0;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    protected readonly target: ViewContainerRef
  ) {}

  setImplementation(implementation: string): void {
    this.implementation = implementation;
  }

  createPriorityQueue(): void {
    this.usedImplementation = this.implementation;
    this.animationArea.clear();
    this.elements = [];
    this.addedValue = 0;
    switch (this.usedImplementation) {
      case 'min-heap-array':
        this.arrayImplementation();
        break;
    }
  }

  updateBinaryTree(): void {
    this.binaryTree ? this.binaryTree.destroy() : null;
    this.treeArea.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      BinaryTreeComponent
    );
    this.binaryTree = this.treeArea.createComponent<BinaryTreeComponent>(
      componentFactory
    );
    this.values = this.elements.map(element => element.instance.value);
    this.binaryTree.instance.values = this.values;
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
      componentRef.instance.value = NULL;
      componentRef.instance.active = true;
      this.elements.push(componentRef);
      this.updateBinaryTree();
    }
  }

  setActiveElement(instance: StackElementComponent, keepCurrent: boolean = false): void {
    for (const element of this.elements) {
      const currentInstance = element.instance;
      if (currentInstance === instance) {
        currentInstance.active = true;
      } else if (!keepCurrent) {
        currentInstance.active = false;
      }
    }
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
    this.elements.push(componentRef);
    this.setActiveElement(componentRef.instance, keepCurrentActive);
    this.heapify();
  }

  pushElement(): void {
    let value = this.newElementInput.element.nativeElement.value;
    if (value === '') return;
    this.addedValue++;
    value = parseInt(value);
    value = value > 999 ? 999 : value;
    this.newElementInput.element.nativeElement.value = value;
    switch (this.usedImplementation) {
      case 'min-heap-array':
        this.pushArrayImplementation(value);
        break;
    }
  }

  pushArrayImplementation(value: string): void {
    this.values.push(value);
    for (const element of this.elements) {
      const instance = element.instance;
      if (instance.value === NULL) {
        instance.value = value;
        this.setActiveElement(instance, false);
        this.heapify();
        return;
      }
    }
    this.addStackElement(value, false);
  }

  heapify(): void {
    for (let i = 0; i < this.elements.length; i++) {
      const currentElement = this.elements[i].instance.value;
      const leftChild =
        this.elements[2 * i + 1] && this.elements[2 * i + 1].instance.value !== NULL
          ? this.elements[2 * i + 1].instance.value
          : null;
      const rightChild =
        this.elements[2 * i + 2] && this.elements[2 * i + 2].instance.value !== NULL
          ? this.elements[2 * i + 2].instance.value
          : null;
      
      if (leftChild && parseInt(currentElement) > parseInt(leftChild)) {
        this.elements[i].instance.value = leftChild;
        this.setActiveElement(this.elements[i].instance, true);
        this.elements[2 * i + 1].instance.value = currentElement;
        this.setActiveElement(this.elements[2 * i + 1].instance, true);
        this.heapify();
        break;
      }
      if (rightChild && parseInt(currentElement) > parseInt(rightChild)) {
        this.elements[i].instance.value = rightChild;
        this.setActiveElement(this.elements[i].instance, true);
        this.elements[2 * i + 2].instance.value = currentElement;
        this.setActiveElement(this.elements[2 * i + 2].instance, true);
        this.heapify();
        break;
      }
    }
    this.updateBinaryTree();
  }

  getMinimum(removeElement: boolean): void {
    for (const element of this.elements) {
      const instance = element.instance;
      if (
        instance.value !== NULL &&
        instance.value !== 'tail' &&
        instance.value !== 'next' &&
        instance.value !== 'head' &&
        instance.value !== 'NULL'
      ) {
        this.result.element.nativeElement.value = instance.value;
        if (removeElement) {
          if (this.addedValue === 1) {
            this.createPriorityQueue();
            return;
          }
          this.elements[0].instance.value = this.elements[this.addedValue-1].instance.value;
          this.elements[this.addedValue-1].destroy();
          this.elements = this.elements.slice(0, this.addedValue-1);
          this.addedValue--;
          this.heapify();
        }
        return;
      }
    }
    this.result.element.nativeElement.value = 'Queue is empty!';
  }

  async removeElement(instance: StackElementComponent): Promise<void> {
    switch (this.usedImplementation) {
      case 'min-heap-array':
        {
          instance.value = NULL;
          this.setActiveElement(instance);
          this.elements = this.elements.slice(1, this.elements.length);
          instance.triggerEnterAnimation();
        }
        break;
    }
  }
}
