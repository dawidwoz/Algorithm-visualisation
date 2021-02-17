import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StackElementComponent } from './stack-element/stack-element.component';


@NgModule({
  imports: [CommonModule],
  declarations: [StackElementComponent],
  exports: [StackElementComponent]
})
export class StackModule {}
