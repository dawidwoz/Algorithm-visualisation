import { Component, Input } from '@angular/core';

@Component({
  selector: 'major-project-binary-tree',
  templateUrl: './binary-tree.component.html',
  styleUrls: ['./binary-tree.component.scss']
})
export class BinaryTreeComponent {

  @Input() values: string[];

  powerOfTwo(x: number): boolean {
    return (Math.log(x)/Math.log(2)) % 1 === 0;
  }

}
