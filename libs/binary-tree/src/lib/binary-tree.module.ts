import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { BinaryTreeComponent, LocalCommonModule } from '@major-project/common';
import { BinarySearchTreeComponent } from './binary-search-tree/binary-search-tree.component';

@NgModule({
  imports: [
    CommonModule,
    LocalCommonModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule
  ],
  declarations: [BinarySearchTreeComponent],
  exports: [BinarySearchTreeComponent],
  entryComponents: [BinaryTreeComponent]
})
export class BinaryTreeModule {}
