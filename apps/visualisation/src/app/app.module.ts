import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { StackComponent } from './stack/stack.component';
import { QueueComponent } from './queue/queue.component';
import { PriorityQueueComponent } from './priority-queue/priority-queue.component';
import { StackModule } from '@major-project/stack';
import { LocalCommonModule } from '@major-project/common';
import { BinaryTreeModule } from '@major-project/binary-tree';
import { HashFunctionModule } from '@major-project/hash-function';
import { MarkovModelModule } from '@major-project/markov-model';
import { QueuePriorityModule } from '@major-project/queue-priority';
import { QueueModule } from '@major-project/queue';
import { NgxBootstrapIconsModule, list } from 'ngx-bootstrap-icons';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { CommonModule } from '@angular/common';

const icons = {
  list
};

@NgModule({
  declarations: [
    AppComponent,
    StackComponent,
    QueueComponent,
    PriorityQueueComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    StackModule,
    BinaryTreeModule,
    HashFunctionModule,
    MarkovModelModule,
    QueuePriorityModule,
    QueueModule,
    LocalCommonModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    NgxBootstrapIconsModule.forRoot(icons, {
      width: '6rem', 
      height: '6rem' 
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }