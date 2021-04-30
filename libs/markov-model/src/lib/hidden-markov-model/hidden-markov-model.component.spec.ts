import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarkovModelModule } from '../markov-model.module';
import { HiddenMarkovModelComponent } from './hidden-markov-model.component';

describe('HiddenMarkovModelComponent', () => {
  let component: HiddenMarkovModelComponent;
  let fixture: ComponentFixture<HiddenMarkovModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarkovModelModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HiddenMarkovModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
