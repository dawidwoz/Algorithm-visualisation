import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'major-project-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(router: Router) {
    router.navigate(['/welcome']);
  }
}
