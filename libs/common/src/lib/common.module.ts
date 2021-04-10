import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrowComponent } from './arrow/arrow.component';
import { NgxBootstrapIconsModule, arrowRight, arrowLeft } from 'ngx-bootstrap-icons';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BinaryTreeElementComponent } from './binary-tree-element/binary-tree-element.component';
import { BinaryTreeComponent } from './binary-tree/binary-tree.component';
import { ElementWrapperComponent } from './element-wrapper/element-wrapper.component';
import { ElementComponent } from './element/element.component';
import { MatChipsModule } from '@angular/material/chips';
import { DescriptionComponent } from './description/description.component';

const icons = {
  arrowRight,
  arrowLeft
};

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatChipsModule,
    NgxBootstrapIconsModule.forRoot(icons, {
      width: '2rem',
      height: '2rem'
    })
  ],
  declarations: [
    ArrowComponent,
    BinaryTreeElementComponent,
    BinaryTreeComponent,
    ElementWrapperComponent,
    ElementComponent,
    DescriptionComponent
  ],
  exports: [
    ArrowComponent,
    BinaryTreeElementComponent,
    BinaryTreeComponent,
    ElementWrapperComponent,
    ElementComponent,
    DescriptionComponent
  ]
})
export class LocalCommonModule {}
