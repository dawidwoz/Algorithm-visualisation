import { Component, Input } from '@angular/core';

@Component({
  selector: 'major-project-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent {
  @Input() steps: string[] | undefined;
  @Input() actualStep: number = -1;
}
