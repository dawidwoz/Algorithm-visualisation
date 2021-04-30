import { APP_BASE_HREF } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RoutesName } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [AppModule],
        providers: [{provide: APP_BASE_HREF, useValue : '/' }]
      });
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
    })
  );

  it('should exist', () => {
    expect(component).toBeDefined();
  });
  it('should set the right description and title', () => {
    component.activeRouter = RoutesName.queue;
    component.setTitleAndDescription();
    expect(component.title).toBe('Queue');
    expect(component.description).toBe('Use animation below to see how the queue works.' +
    '<p>You can create a circular array and doubly linked-list version of the size from 5 to 20.</p>');
  });
});
