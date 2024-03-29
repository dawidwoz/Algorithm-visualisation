import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { RoutesName } from './app-routing.module';
import { MediaMatcher } from '@angular/cdk/layout';
import { NavigationEnd, Router } from '@angular/router';

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

  public RoutesName = RoutesName;

  public constructor(
    protected readonly media: MediaMatcher,
    protected readonly changeDetectorRef: ChangeDetectorRef,
    protected readonly router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    router.events.subscribe((val: NavigationEnd) => {
      val && val.url ? this.activeRouter = val.url.slice(1) : null;
      this.setTitleAndDescription(); 
  });
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

  public setTitleAndDescription(): void {
    switch (this.activeRouter) {
      case RoutesName.stack:
        this.title = 'Stack';
        this.description =
          `Use animation below to see how the stack works. 
          <p>You can create an array and linked-list version of the size from 5 to 20.</.p>`;
        break;
      case RoutesName.queue:
        this.title = 'Queue';
        this.description =
          'Use animation below to see how the queue works.' +
          '<p>You can create a circular array and doubly linked-list version of the size from 5 to 20.</p>';
        break;
      case RoutesName['priority-queue']:
        this.title = 'Priority Queue';
        this.description =
          'Use animation below to see how the priority queue works.' +
          '<p>You can create a heap array version of the size from 5 to 20.</p>' +
          '<p>The binary tree can be displayed up to 15 elements.</p>';
        break;
      case RoutesName['hash-function']:
        this.title = 'Hash functions with collision handling';
        this.description =
          'Use animation below to see how the hash functions with collision handling work.' +
          '<p>You can create a hash table of the size from 3 to 20.</p>';
        break;
      case RoutesName['binary-search-tree']:
        this.title = 'Binary search tree';
        this.description = 'The binary tree can be displayed up to 15 elements (4 layers).';
        break;
      case RoutesName['hidden-markov-model']:
        this.title = 'Hidden Markov Model';
        this.description = '';
        break;
      default:
        this.title = 'Stack';
        this.description =
          `Use animation below to see how the stack works. 
          <p>You can create an array and linked-list version of the size from 5 to 20.</.p>`;
    }
  }
}
