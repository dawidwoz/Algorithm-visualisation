import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrowComponent } from './arrow/arrow.component';
import { NgxBootstrapIconsModule, arrowRight } from 'ngx-bootstrap-icons';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const icons = {
  arrowRight
};

@NgModule({
  imports: [CommonModule, BrowserModule, BrowserAnimationsModule, NgxBootstrapIconsModule.forRoot(icons, {
    width: '2rem', 
    height: '2rem' 
  })],
  declarations: [ArrowComponent],
  exports: [ArrowComponent]
})
export class LocalCommonModule {}
