import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackElementComponent } from './stack-element.component';

describe('StackElementComponent', () => {
  let component: StackElementComponent;
  let fixture: ComponentFixture<StackElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StackElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StackElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
