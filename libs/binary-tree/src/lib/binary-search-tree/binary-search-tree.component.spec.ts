import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BinarySearchTreeComponent } from './binary-search-tree.component';
import { BinaryTreeModule } from '../binary-tree.module';
import { NULL } from '@major-project/common';

describe('AppComponent', () => {
  let component: BinarySearchTreeComponent;
  let fixture: ComponentFixture<BinarySearchTreeComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [BinaryTreeModule]
      });
      fixture = TestBed.createComponent(BinarySearchTreeComponent);
      component = fixture.componentInstance;
    })
  );

  it('should exist', () => {
    expect(component).toBeDefined();
  });

  it('should create a binary tree', () => {
    component.clearBinaryTree();
    expect(component.values).toStrictEqual([NULL]);
    expect(component.currentSteps).toBeUndefined();
  });

  it('should remove an element with the given index', () => {
    component.values = ['0', '1', '2'];
    component.removeElement(2);
    expect(component.values).toStrictEqual(['0', '1', undefined]);
  });

  it('should set right active element', () => {
    component.values = ['0', '1', '2'];
    component.booleanElements = [true, true, false];
    component.setActiveElement(1);
    expect(component.booleanElements).toStrictEqual([false, true, false]);
  });
});
