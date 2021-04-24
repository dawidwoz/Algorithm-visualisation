import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxBootstrapIconsModule, list } from 'ngx-bootstrap-icons';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

import { AppComponent } from './app.component';
import { StackComponent } from './stack/stack.component';
import { QueueComponent } from './queue/queue.component';
import { PriorityQueueComponent } from './priority-queue/priority-queue.component';
import { HashFunctionComponent } from './hash-function/hash-function.component';
import { BinarySearchTreeComponent } from './binary-search-tree/binary-search-tree.component';
import { HiddenMarkovModelComponent } from './hidden-markov-model/hidden-markov-model.component';
import { AppRoutingModule } from './app-routing.module';

import { StackModule } from '@major-project/stack';
import { LocalCommonModule } from '@major-project/common';
import { BinaryTreeModule } from '@major-project/binary-tree';
import { HashFunctionModule } from '@major-project/hash-function';
import { MarkovModelModule } from '@major-project/markov-model';
import { QueuePriorityModule } from '@major-project/queue-priority';
import { QueueModule } from '@major-project/queue';

const icons = {
  list
};

@NgModule({
  declarations: [
    AppComponent,
    BinarySearchTreeComponent,
    HiddenMarkovModelComponent,
    StackComponent,
    QueueComponent,
    PriorityQueueComponent,
    HashFunctionComponent
  ],
  imports: [
    CommonModule,
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
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSliderModule,
    MatListModule,
    MatIconModule,
    MatChipsModule,
    NgxBootstrapIconsModule.forRoot(icons, {
      width: '6vw', 
      height: '6vw' 
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }