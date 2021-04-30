import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { QueueComponent } from './queue/queue.component';
import { ElementComponent, LocalCommonModule } from '@major-project/common';

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
  declarations: [QueueComponent],
  exports: [QueueComponent],
  bootstrap: [QueueComponent],
  entryComponents: [ElementComponent]
})
export class QueueModule {}
