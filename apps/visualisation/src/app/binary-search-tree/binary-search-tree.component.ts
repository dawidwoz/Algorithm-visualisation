import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { MatSlider } from '@angular/material/slider';
import { BinaryTreeComponent, NULL } from '@major-project/common';

@Component({
  selector: 'major-project-binary-search-tree',
  templateUrl: './binary-search-tree.component.html',
  styleUrls: ['./binary-search-tree.component.scss']
})
export class BinarySearchTreeComponent {
  @ViewChild('animationArea', { static: true, read: ViewContainerRef })
  animationArea: ViewContainerRef;
  @ViewChild('size', { static: true, read: ViewContainerRef }) sizeInput: ViewContainerRef;
  @ViewChild('remove', { static: true, read: ViewContainerRef }) removeInput: ViewContainerRef;
  @ViewChild('result', { static: true, read: ViewContainerRef }) resultInput: ViewContainerRef;
  @ViewChild('search', { static: true, read: ViewContainerRef }) searchInput: ViewContainerRef;
  @ViewChild('animationSpeed', { static: true, read: MatSlider })
  animationSpeedInput: MatSlider;
  @ViewChild('newElement', { static: true, read: ViewContainerRef })
  newElementInput: ViewContainerRef;

  public binaryTree?: ComponentRef<BinaryTreeComponent>;
  public values: string[] = [];
  public booleanElements: boolean[] = [];

  constructor(
    protected readonly componentFactoryResolver: ComponentFactoryResolver,
    protected readonly target: ViewContainerRef
  ) {}

  createBinaryTree(): void {
    this.animationArea.clear();
    this.values = [];
    this.booleanElements = [];
    this.values.push(NULL);
    this.booleanElements.push(true);
    this.updateBinaryTree();
  }

  pushElement(): void {
    const value: string = this.newElementInput.element.nativeElement.value;
    if (value === '') return;
    if (this.values[0] === NULL) {
      this.values[0] = value;
      return;
    }
    let i = 0;
    const valueNumber: number = parseInt(value);

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const currentNumber = parseInt(this.values[i]);
      if (currentNumber > valueNumber) {
        if (!this.values[2 * i + 1]) {
          this.values[2 * i + 1] = valueNumber.toString();
          this.booleanElements[2 * i + 1] = true;
          break;
        } else {
          i = 2 * i + 1;
          continue;
        }
      }
      if (currentNumber <= valueNumber) {
        if (!this.values[2 * i + 2]) {
          this.values[2 * i + 2] = valueNumber.toString();
          this.booleanElements[2 * i + 2] = true;
          break;
        } else {
          i = 2 * i + 2;
          continue;
        }
      }
    }
    this.setActiveElement(valueNumber);
    console.log(this.booleanElements);
    this.updateBinaryTree();
  }

  setActiveElement(active: number): void {
    for (let i = 0; i < this.booleanElements.length; i++) {
      if (!this.booleanElements[i] || !this.values[i]) continue;
      this.booleanElements[i] = false;
      if (this.values[i] === active.toString()) {
        this.booleanElements[i] = true;
      }
    }
  }

  getElement(removeElement: boolean): void {
    let element: string = '0';
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

    let i = 0;
    const valueNumber: number = parseInt(element);

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const currentNumber = parseInt(this.values[i]);
      if (currentNumber == valueNumber) {
        this.booleanElements[i] = true;
        this.resultInput.element.nativeElement.innerHTML = valueNumber;
        if (removeElement) this.removeElement(i);
        break;
      }
      if (currentNumber > valueNumber) {
        if (!this.values[2 * i + 1]) {
          this.resultInput.element.nativeElement.innerHTML = 'Not found!';
          break;
        } else {
          i = 2 * i + 1;
          continue;
        }
      }
      if (currentNumber <= valueNumber) {
        if (!this.values[2 * i + 2]) {
          this.resultInput.element.nativeElement.innerHTML = 'Not found!';
          break;
        } else {
          i = 2 * i + 2;
          continue;
        }
      }
    }
    this.setActiveElement(valueNumber);
  }

  removeElement(indexToRemove: number): void {
    let indexToReplace = indexToRemove;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (this.values[2 * indexToReplace + 2] !== undefined) {
        indexToReplace = 2 * indexToReplace + 2;
      } else {
        break;
      }
    }
    this.values[indexToRemove] = this.values[indexToReplace];
    this.values[indexToReplace] = undefined;
    this.setActiveElement(parseInt(this.values[indexToRemove]));
    this.updateBinaryTree();
  }

  updateBinaryTree(): void {
    this.binaryTree ? this.binaryTree.destroy() : null;
    this.animationArea.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      BinaryTreeComponent
    );
    this.binaryTree = this.animationArea.createComponent<BinaryTreeComponent>(componentFactory);
    this.values.length > 15 ? (this.values = this.values.slice(0, 15)) : this.values;
    this.binaryTree.instance.values = this.values;
    this.binaryTree.instance.time = this.animationSpeedInput.value;
    this.binaryTree.instance.activeValues = this.booleanElements;
  }
}
