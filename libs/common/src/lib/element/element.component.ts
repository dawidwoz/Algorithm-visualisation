import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'major-project-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss'],
  animations: [
    trigger('onStart', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [
        style({ opacity: 0, transform: 'scale(0.5) translateY(50px)' }),
        animate(
          '{{ time }}',
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
          '{{ time }}',
          keyframes([
            style({ opacity: 0.5, offset: 0.3 }),
            style({ transform: 'scale(0.5) translateY(50px)', offset: 0.6 }),
            style({ opacity: 0, offset: 1 })
          ])
        )
      ])
    ]),
    trigger('onChange', [
      state('true', style({ opacity: 1 })),
      state('false', style({ opacity: 1 })),
      transition('false <=> true', [
        style({ opacity: 0, transform: 'scale(0.5) translateY(50px)' }),
        animate(
          '{{ time }}',
          keyframes([
            style({ opacity: 1, offset: 0.3 }),
            style({ transform: 'translateY(0)', offset: 0.6 }),
            style({ transform: 'scale(1)', offset: 1 })
          ])
        )
      ])
    ]),
    trigger('onExit', [
      state('true', style({ opacity: 1 })),
      state('false', style({ opacity: 1 })),
      transition('false <=> true', [
        style({ opacity: 1, transform: 'scale(1) translateY(0)' }),
        animate(
          '{{ time }}',
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
export class ElementComponent {
  @Input() value: string;
  @Input() texts: string[] = [];
  @Input() badgeExtraMargin: boolean = false;
  @Input() animation: boolean = false;
  @Input() number: number | undefined;
  @Input() time: number = 0;
  @Input() active: boolean = false;

  public onChange: boolean = false;
  public onExit: boolean = false;

  triggerEnterAnimation() {
    this.onChange = !this.onChange;
  }

  triggerExitAnimation() {
    this.onExit = !this.onExit;
  }
}
