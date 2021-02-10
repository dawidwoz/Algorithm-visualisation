import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StackComponent } from './stack/stack.component';
import { QueueComponent } from './queue/queue.component';
import { PriorityQueueComponent } from './priority-queue/priority-queue.component';
import { WelcomeComponent } from './welcome/welcome.component'; 

@NgModule({
  declarations: [
    AppComponent,
    StackComponent,
    QueueComponent,
    PriorityQueueComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }