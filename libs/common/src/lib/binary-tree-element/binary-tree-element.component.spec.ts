import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinaryTreeElementComponent } from './binary-tree-element.component';

describe('BinaryTreeElementComponent', () => {
  let component: BinaryTreeElementComponent;
  let fixture: ComponentFixture<BinaryTreeElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BinaryTreeElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BinaryTreeElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
