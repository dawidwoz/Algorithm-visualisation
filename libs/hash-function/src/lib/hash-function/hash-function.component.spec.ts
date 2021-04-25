import { APP_BASE_HREF } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HashFunctionModule } from '../hash-function.module';
import { HashFunctionComponent } from './hash-function.component';

describe('PriorityQueueComponent', () => {
  let component: HashFunctionComponent;
  let fixture: ComponentFixture<HashFunctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HashFunctionModule],
      providers: [{provide: APP_BASE_HREF, useValue : '/' }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HashFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
