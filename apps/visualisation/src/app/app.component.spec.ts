import { TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BinaryTreeModule } from '@major-project/binary-tree';
import { LocalCommonModule } from '@major-project/common';
import { HashFunctionModule } from '@major-project/hash-function';
import { MarkovModelModule } from '@major-project/markov-model';
import { QueueModule } from '@major-project/queue';
import { QueuePriorityModule } from '@major-project/queue-priority';
import { StackModule } from '@major-project/stack';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        StackModule,
        BinaryTreeModule,
        HashFunctionModule,
        MarkovModelModule,
        QueuePriorityModule,
        QueueModule,
        LocalCommonModule
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
