import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrowComponent } from './arrow.component';
import { LocalCommonModule } from '../common.module';

describe('ArrowComponent', () => {
  let component: ArrowComponent;
  let fixture: ComponentFixture<ArrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ LocalCommonModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
