import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { LocalCommonModule } from '@major-project/common';
import { StackComponent } from './stack/stack.component';

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
  declarations: [StackComponent],
  exports: [StackComponent],
  bootstrap: [StackComponent]
})
export class StackModule {}
