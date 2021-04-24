import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BinarySearchTreeComponent } from './binary-search-tree/binary-search-tree.component';
import { HashFunctionComponent } from './hash-function/hash-function.component';
import { HiddenMarkovModelComponent } from './hidden-markov-model/hidden-markov-model.component';
import { PriorityQueueComponent } from './priority-queue/priority-queue.component';
import { QueueComponent } from './queue/queue.component';
import { StackComponent } from './stack/stack.component';

export const RoutesName = {
  stack: 'stack',
  queue: 'queue',
  'priority-queue': 'priority-queue',
  'hash-function': 'hash-function',
  'binary-search-tree': 'binary-search-tree',
  'hidden-markov-model': 'hidden-markov-model',
  default: 'stack'
};

const routes: Routes = [
  { path: RoutesName.stack, component: StackComponent },
  { path: RoutesName.queue, component: QueueComponent },
  { path: RoutesName['priority-queue'], component: PriorityQueueComponent },
  { path: RoutesName['hash-function'], component: HashFunctionComponent},
  { path: RoutesName['binary-search-tree'], component: BinarySearchTreeComponent },
  { path: 'hidden-markov-model', component: HiddenMarkovModelComponent },
  { path: '', redirectTo: '/' + RoutesName.default, pathMatch: 'full' },
  { path: '**', redirectTo: '/' + RoutesName.default, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
