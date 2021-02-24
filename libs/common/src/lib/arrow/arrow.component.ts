import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'major-project-arrow',
  templateUrl: './arrow.component.html',
  styleUrls: ['./arrow.component.scss'],
  animations: [
    trigger('onStart', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [
        style({ opacity: 0, transform: 'scale(0.5) translateY(50px)' }),
        animate(
          '1s',
          keyframes([
            style({ opacity: 1, offset: 0.3 }),
            style({ transform: 'translateY(0)', offset: 0.6 }),
            style({ transform: 'scale(1)', offset: 1 })
          ])
        )
      ]),
      transition('* => void', [
        style({ opacity: 1, transform: 'scale(1) translateY(0)' }),
        animate(
          '1s',
          keyframes([
            style({ opacity: 0.5, offset: 0.3 }),
            style({ transform: 'scale(0.5) translateY(50px)', offset: 0.6 }),
            style({ opacity: 0, offset: 1 })
          ])
        )
      ])
    ])
  ]
})
export class ArrowComponent {
  @Input() direction: 'left' | 'right' = 'right';
  @HostBinding('@onStart') public animation: boolean = true;
}
