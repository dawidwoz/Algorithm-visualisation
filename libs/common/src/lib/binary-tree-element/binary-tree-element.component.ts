import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'major-project-binary-tree-element',
  templateUrl: './binary-tree-element.component.html',
  styleUrls: ['./binary-tree-element.component.scss'],
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
            style({ transform: 'scale(1)', offset: 1 }),
          ])
        ),
      ]),
      transition('* => void', [
        style({ opacity: 1, transform: 'scale(1) translateY(0)' }),
        animate(
          '{{ time }}',
          keyframes([
            style({ opacity: 0.5, offset: 0.3 }),
            style({ transform: 'scale(0.5) translateY(50px)', offset: 0.6 }),
            style({ opacity: 0, offset: 1 }),
          ])
        ),
      ]),
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
            style({ transform: 'scale(1)', offset: 1 }),
          ])
        ),
      ]),
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
            style({ opacity: 0, offset: 1 }),
          ])
        )
      ])
    ])
  ]
})
export class BinaryTreeElementComponent {
  @Input() value: string | undefined;
  @Input() time: number | undefined;
  @Input() active: boolean = false;
  @Input() break: boolean = false;
  @Input() left: boolean = false;
  @Input() right: boolean = false;
  

  public onChange: boolean = false;
  public onExit: boolean = false;

  triggerEnterAnimation() { this.onChange=!this.onChange; console.log(this.time);}

  triggerExitAnimation() { this.onExit=!this.onExit; console.log(this.time);}
}
