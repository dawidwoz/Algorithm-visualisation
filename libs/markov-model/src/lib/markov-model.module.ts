import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { HiddenMarkovModelComponent } from './hidden-markov-model/hidden-markov-model.component';

@NgModule({
  imports: [CommonModule, 
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule, 
    MatListModule, 
    MatIconModule,
    MatChipsModule,
    MatSliderModule],
  declarations: [HiddenMarkovModelComponent],
  exports: [HiddenMarkovModelComponent],
  bootstrap: [HiddenMarkovModelComponent]
})
export class MarkovModelModule {}
