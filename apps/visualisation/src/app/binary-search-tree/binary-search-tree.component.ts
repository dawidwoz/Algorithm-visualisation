import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { BinaryTreeComponent, ElementComponent, NULL, setActiveElement } from '@major-project/common';

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
  @ViewChild('newElement', { static: true, read: ViewContainerRef })
  newElementInput: ViewContainerRef;

  public elements: ComponentRef<ElementComponent>[] = [];
  public binaryTree?: ComponentRef<BinaryTreeComponent>;
  public values: string[] = [];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    protected readonly target: ViewContainerRef
  ) {}

  createBinaryTree(): void {
    this.animationArea.clear();
    this.elements = [];
  }

  pushElement(): void {}
  
  getElement(): void {}

  updateBinaryTree(): void {
    this.binaryTree ? this.binaryTree.destroy() : null;
    this.animationArea.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      BinaryTreeComponent
    );
    this.binaryTree = this.animationArea.createComponent<BinaryTreeComponent>(componentFactory);
    this.values = this.elements.map(element => element.instance.value);
    this.values.length > 15 ? (this.values = this.values.slice(0, 15)) : this.values;
    this.binaryTree.instance.values = this.values;
    //this.binaryTree.instance.time = this.animationSpeedInput.value;
    const booleanElements = [];
    for (const element of this.elements) {
      booleanElements.push(element.instance.active);
    }
    this.binaryTree.instance.activeValues = booleanElements;
  }
}
