import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HashFunctionComponent } from './hash-function/hash-function.component';
import { PriorityQueueComponent } from './priority-queue/priority-queue.component';
import { QueueComponent } from './queue/queue.component';
import { StackComponent } from './stack/stack.component';

export const RoutesName = {
  stack: 'stack',
  queue: 'queue',
  'priority-queue': 'priority-queue',
  'hash-function': 'hash-function',
  default: 'stack'
};

const routes: Routes = [
  { path: RoutesName.stack, component: StackComponent },
  { path: RoutesName.queue, component: QueueComponent },
  { path: RoutesName['priority-queue'], component: PriorityQueueComponent },
  { path: RoutesName['hash-function'], component: HashFunctionComponent},
  { path: '', redirectTo: '/' + RoutesName.default, pathMatch: 'full' },
  { path: '**', redirectTo: '/' + RoutesName.default, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
