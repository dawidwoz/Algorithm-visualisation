import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { MatSlider } from '@angular/material/slider';
import { ElementComponent, BinaryTreeComponent } from '@major-project/common';
import { getMinPriorityQueue, getMinPriorityQueueSteps, insertPriorityQueue, insertPriorityQueueSteps } from '@major-project/queue-priority';

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
  public binaryTree?: ComponentRef<BinaryTreeComponent>;
  public values: string[] = [];
  public usedImplementation?: string;
  public addedValue: number = 0;
  public initialSizeArray: number = 0;

  constructor(
    protected readonly componentFactoryResolver: ComponentFactoryResolver,
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
    this.binaryTree = this.treeArea.createComponent<BinaryTreeComponent>(componentFactory);
    this.values = this.elements.map(element => element.instance.value);
    this.values.length > 15 ? this.values = this.values.slice(0,15) : this.values;
    this.binaryTree.instance.values = this.values;
    this.binaryTree.instance.time = this.animationSpeedInput.value;
    const booleanElements = [];
    for (const element of this.elements) {
      booleanElements.push(element.instance.active);
    }
    this.binaryTree.instance.activeValues = booleanElements;
  }

  arrayImplementation(): void {
    const size =
      this.sizeInput.element.nativeElement.value !== ''
        ? this.sizeInput.element.nativeElement.value
        : (this.sizeInput.element.nativeElement.value = 5);
    this.initialSizeArray = size;
    for (let i = 0; i < size; i++) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        ElementComponent
      );
      const componentRef = this.animationArea.createComponent<ElementComponent>(componentFactory);
      componentRef.instance.time = this.animationSpeedInput.value;
      componentRef.instance.value = NULL;
      componentRef.instance.active = true;
      this.elements.push(componentRef);
      this.updateBinaryTree();
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

  addStackElement(value: string, keepCurrentActive: boolean = false): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      ElementComponent
    );
    const componentRef = this.animationArea.createComponent<ElementComponent>(componentFactory);
    componentRef.instance.time = this.animationSpeedInput.value;
    componentRef.instance.value = value;
    this.elements.push(componentRef);
    this.setActiveElement(componentRef.instance, keepCurrentActive);
    this.heapify();
  }

  insertElement(): void {
    let value = this.newElementInput.element.nativeElement.value;
    if (value === '') return;
    this.addedValue++;
    value = parseInt(value);
    value = value > 999 ? 999 : value;
    value = 1 > value ? 1 : value;
    this.newElementInput.element.nativeElement.value = value;
    switch (this.usedImplementation) {
      case 'min-heap-array':
        this.currentTitle = insertPriorityQueue;
        this.currentSteps = insertPriorityQueueSteps;
        this.actualStep = 1;
        this.pushArrayImplementation(value);
        break;
    }
  }

  pushArrayImplementation(value: string): void {
    this.values.push(value);
    for (const element of this.elements) {
      const instance = element.instance;
      if (instance.value === NULL) {
        instance.time = this.animationSpeedInput.value;
        instance.value = value;
        instance.triggerEnterAnimation();
        this.setActiveElement(instance, false);
        this.actualStep = 2;
        this.heapify();
        return;
      }
    }
    this.addStackElement(value, false);
    for (let i = 0; i < this.initialSizeArray-1; i++) {
      this.addStackElement(NULL, true);
    }
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

  getMinimum(): void {
    this.currentTitle = getMinPriorityQueue;
    this.currentSteps = getMinPriorityQueueSteps;
    this.actualStep = 1;
    this.getLastElement(false);
  }

  removeMinimum(): void {
    this.getLastElement(true);
  }

  getLastElement(removeElement: boolean): void {
    for (const element of this.elements) {
      const instance = element.instance;
      instance.time = this.animationSpeedInput.value;
      if (instance.value !== NULL) {
        this.result.element.nativeElement.value = instance.value;
        if (removeElement) {
          if (this.addedValue === 1) {
            this.createPriorityQueue();
            return;
          }
          this.elements[0].instance.value = this.elements[this.addedValue - 1].instance.value;
          this.elements[0].instance.time = this.animationSpeedInput.value;
          this.elements[this.addedValue - 1].instance.value = NULL;
          this.elements[this.addedValue - 1].instance.time = this.animationSpeedInput.value;
          this.elements[this.addedValue - 1].instance.triggerEnterAnimation();
          this.setActiveElement(this.elements[this.addedValue - 1].instance, false);
          this.addedValue--;
          this.heapify();
        }
        this.actualStep = 2;
        return;
      }
    }
    this.result.element.nativeElement.value = 'Priority queue is empty!';
    this.actualStep = 3;
  }
}
