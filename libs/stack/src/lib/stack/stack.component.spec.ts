import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StackModule } from '../stack.module';

import { StackComponent } from './stack.component';

describe('StackComponent', () => {
  let component: StackComponent;
  let fixture: ComponentFixture<StackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StackModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create stack correctly', () => {
    component.implementation = 'simple-array';
    component.createStack();
    expect(component.usedImplementation).toBe('simple-array');
    expect(component.currentSteps).toBeUndefined();
    expect(component.currentTitle).toBeUndefined();
    expect(component.arrowElements).toStrictEqual([]);
  });

  it('should add arrow to the stack linked-list implementation correctly', () => {
    component.arrowElements = [];
    component.addArrow();
    expect(component.arrowElements).toHaveLength(1);
  });

});
