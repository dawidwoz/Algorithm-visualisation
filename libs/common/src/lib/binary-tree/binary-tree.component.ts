import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  ViewChild
} from '@angular/core';
import 'leader-line';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let LeaderLine: any;

@Component({
  selector: 'major-project-binary-tree',
  templateUrl: './binary-tree.component.html',
  styleUrls: ['./binary-tree.component.scss']
})
export class BinaryTreeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('one', { read: ElementRef }) startingElement: ElementRef;
  @ViewChild('two', { read: ElementRef }) endingElement: ElementRef;

  @Input() values: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public lines: any[] = [];
  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnDestroy(): void {
    for (let i = 0; i < this.lines.length; i++) {
      console.log(this.lines[i]);
      this.lines[i].remove();
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      for (let i = 0; i < this.values.length; i++) {
        const leftChild = 2 * i + 1;
        const rightChild = 2 * i + 2;
        if (this.values[leftChild]) {
          const line = new LeaderLine(
            this.document.getElementById(i + '__element'),
            this.document.getElementById(leftChild + '__element')
          );
          line.path = 'straight';
          line.setOptions({ startSocket: 'bottom', endSocket: 'top' });
          this.lines.push(line);
        }
        if (this.values[rightChild]) {
          const line = new LeaderLine(
            this.document.getElementById(i + '__element'),
            this.document.getElementById(rightChild + '__element')
          );
          line.path = 'straight';
          line.setOptions({ startSocket: 'bottom', endSocket: 'top' });
          this.lines.push(line);
        }
      }
    }, 1);
  }

  powerOfTwo(x: number): boolean {
    return (Math.log(x) / Math.log(2)) % 1 === 0;
  }
}
