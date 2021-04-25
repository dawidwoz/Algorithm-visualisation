import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BinarySearchTreeComponent } from '@major-project/binary-tree';
import { HashFunctionComponent } from '@major-project/hash-function';
import { HiddenMarkovModelComponent } from '@major-project/markov-model';
import { QueueComponent } from '@major-project/queue';
import { PriorityQueueComponent } from '@major-project/queue-priority';
import { StackComponent } from '@major-project/stack';

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
