import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StackComponent } from './stack/stack.component';
import { QueueComponent } from './queue/queue.component';
import { PriorityQueueComponent } from './priority-queue/priority-queue.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { StackModule } from '@major-project/stack';
import { LocalCommonModule } from '@major-project/common';
import { BinaryTreeModule } from '@major-project/binary-tree';
import { HashFunctionModule } from '@major-project/hash-function';
import { MarkovModelModule } from '@major-project/markov-model';
import { QueuePriorityModule } from '@major-project/queue-priority';
import { QueueModule } from '@major-project/queue';
import { NgxBootstrapIconsModule, list } from 'ngx-bootstrap-icons';
import { MatSelectModule } from '@angular/material/select';

const icons = {
  list
};

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
    AppRoutingModule,
    StackModule,
    BinaryTreeModule,
    HashFunctionModule,
    MarkovModelModule,
    QueuePriorityModule,
    QueueModule,
    LocalCommonModule,
    MatSelectModule,
    NgxBootstrapIconsModule.forRoot(icons, {
      width: '6rem', 
      height: '6rem' 
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }