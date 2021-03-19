import { Component, OnInit } from '@angular/core';
import { RoutesName } from './app-routing.module';

@Component({
  selector: 'major-project-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public activeRouter: string = '';
  public title: string = '';
  public description: string = '';

  protected ngOnInit(): void {
    this.activeRouter = window.location.pathname.toString().substring(1);
    this.setTitleAndDescription();
  }

  protected setTitleAndDescription(): void {
    console.log(this.activeRouter);
    switch (this.activeRouter) {
      case RoutesName.stack:
        this.title = 'Stack';
        this.description =
          'Use animation below to see how the stack works. \n You can create an array and linked-list version of the size from 5 to 20.';
        break;
      case RoutesName.queue:
        this.title = 'Queue';
        this.description =
          'Use animation below to see how the queue works. \n' 
          + 'You can create a circular array and doubly linked-list version of the size from 5 to 20.';
          break;
      case RoutesName.priorityQueue:
        this.title = 'Priority Queue';
        this.description = 'Use animation below to see how the priority queue works. \n' + 
        'You can create a heap array version of the size from 5 to 20.';
        break;
      case RoutesName.hashFunction:
        this.title = 'Hash functions with collision handling';
        this.description = 'Use animation below to see how the hash functions with collision handling work.\n'
         + 'You can create a hash table of the size from 0 to 20.';
         break;
      default:
        this.title = 'Stack';
        this.description =
          'Use animation below to see how the stack works. \n You can create an array and linked-list version of the size from 5 to 20.';
    }
  }
}
