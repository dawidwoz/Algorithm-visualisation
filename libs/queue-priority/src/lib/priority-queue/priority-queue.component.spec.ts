import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QueuePriorityModule } from '../queue-priority.module';

import { PriorityQueueComponent } from './priority-queue.component';

describe('PriorityQueueComponent', () => {
  let component: PriorityQueueComponent;
  let fixture: ComponentFixture<PriorityQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueuePriorityModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorityQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create priority queue correctly', () => {
    component.implementation = 'min-heap-array';
    component.createPriorityQueue();
    expect(component.usedImplementation).toBe('min-heap-array');
    expect(component.currentSteps).toBeUndefined();
    expect(component.currentTitle).toBeUndefined();
    expect(component.addedValue).toBe(0);
  });

  it('should add element to the priority queue correctly', () => {
    component.elements = [];
    component.addStackElement('1');
    expect(component.elements).toHaveLength(1);
  });
});
