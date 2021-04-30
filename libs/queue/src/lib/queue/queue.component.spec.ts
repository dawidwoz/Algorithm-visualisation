import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QueueModule } from '../queue.module';

import { QueueComponent } from './queue.component';

describe('QueueComponent', () => {
  let component: QueueComponent;
  let fixture: ComponentFixture<QueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueueModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create queue correctly', () => {
    component.implementation = 'simple-array';
    component.createQueue();
    expect(component.currentSteps).toBeUndefined();
    expect(component.currentTitle).toBeUndefined();
    expect(component.arrowElements).toStrictEqual([]);
  });

  it('should create queue correctly', () => {
    component.implementation = 'simple-array';
    component.createQueue();
    expect(component.currentSteps).toBeUndefined();
    expect(component.currentTitle).toBeUndefined();
    expect(component.arrowElements).toStrictEqual([]);
  });

  it('should add element to the queue correctly', () => {
    component.elements = [];
    component.addElement('1');
    expect(component.elements).toHaveLength(1);
  });
});
