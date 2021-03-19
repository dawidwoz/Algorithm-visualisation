import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { RoutesName } from './app-routing.module';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'major-project-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  public routes: Array<{ name: string; value: string }> = [];
  public activeRouter: string = '';
  public title: string = '';
  public description: string = '';

  protected constructor(
    protected readonly media: MediaMatcher,
    protected readonly changeDetectorRef: ChangeDetectorRef,
    protected readonly router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  public ngOnInit(): void {
    this.activeRouter = window.location.pathname.toString().substring(1);
    for (const element in RoutesName) {
      if (element !== 'default') {
        this.routes.push({
          name: element,
          value: RoutesName[element]
        });
      }
    }
    console.log(this.routes);
    this.setTitleAndDescription();
  }

  public navigationClick(link: string): void {
    this.router.navigate(['/' + link]);
    this.activeRouter = link;
    this.setTitleAndDescription();
  }

  public ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
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
          'Use animation below to see how the queue works. \n' +
          'You can create a circular array and doubly linked-list version of the size from 5 to 20.';
        break;
      case RoutesName['priority-queue']:
        this.title = 'Priority Queue';
        this.description =
          'Use animation below to see how the priority queue works. \n' +
          'You can create a heap array version of the size from 5 to 20.';
        break;
      case RoutesName['hash-function']:
        this.title = 'Hash functions with collision handling';
        this.description =
          'Use animation below to see how the hash functions with collision handling work.\n' +
          'You can create a hash table of the size from 0 to 20.';
        break;
      default:
        this.title = 'Stack';
        this.description =
          'Use animation below to see how the stack works. \n You can create an array and linked-list version of the size from 5 to 20.';
    }
  }
}
