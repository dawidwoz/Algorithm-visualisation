import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrowComponent } from './arrow/arrow.component';
import { NgxBootstrapIconsModule, arrowRight } from 'ngx-bootstrap-icons';

const icons = {
  arrowRight
};

@NgModule({
  imports: [CommonModule, NgxBootstrapIconsModule.forRoot(icons, {
    width: '2rem', 
    height: '2rem' 
  })],
  declarations: [ArrowComponent],
  exports: [ArrowComponent]
})
export class LocalCommonModule {}
