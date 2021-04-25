import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { LocalCommonModule } from '@major-project/common';
import { HashFunctionComponent } from './hash-function/hash-function.component';

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
  declarations: [HashFunctionComponent],
  exports: [HashFunctionComponent],
  bootstrap: [HashFunctionComponent]
})
export class HashFunctionModule {}
