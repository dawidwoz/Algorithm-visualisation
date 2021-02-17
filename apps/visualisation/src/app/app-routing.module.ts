import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { PriorityQueueComponent } from './priority-queue/priority-queue.component';
import { QueueComponent } from './queue/queue.component';
import { StackComponent } from './stack/stack.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
    { path: 'stack', component: StackComponent },
    { path: 'queue', component: QueueComponent },
    { path: 'priority-queue', component: PriorityQueueComponent },
    { path: 'welcome', component: WelcomeComponent }, 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }