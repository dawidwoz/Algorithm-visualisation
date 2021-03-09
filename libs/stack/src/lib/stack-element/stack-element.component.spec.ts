import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StackElementComponent } from './stack-element.component';
import { StackModule } from '../stack.module';

describe('StackElementComponent', () => {
  let component: StackElementComponent;
  let fixture: ComponentFixture<StackElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ StackModule ]
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
