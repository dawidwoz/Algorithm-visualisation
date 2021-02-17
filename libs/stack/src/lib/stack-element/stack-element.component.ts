import { Component, Input } from '@angular/core';

@Component({
  selector: 'stack-element',
  templateUrl: './stack-element.component.html',
  styleUrls: ['./stack-element.component.scss']
})
export class StackElementComponent {
  @Input() value: string;
  @Input() number: number | undefined;
}
