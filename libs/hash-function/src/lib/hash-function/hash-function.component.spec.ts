import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HashFunctionModule } from '../hash-function.module';

import { HashFunctionComponent } from './hash-function.component';

describe('HashFunctionComponent', () => {
  let component: HashFunctionComponent;
  let fixture: ComponentFixture<HashFunctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HashFunctionModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HashFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create hash function correctly', () => {
    component.createHashFunction();
    expect(component.currentSteps).toBeUndefined();
    expect(component.elementsLinear).toStrictEqual([]);
    expect(component.elementsSeparateChaining).toStrictEqual([]);
  });

  it('should add element to the hash function correctly', () => {
    component.elementsLinear = [];
    component.addElement('1');
    expect(component.elementsLinear).toHaveLength(1);
  });
});
