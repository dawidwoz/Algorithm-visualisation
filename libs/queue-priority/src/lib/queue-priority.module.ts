import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { LocalCommonModule } from '@major-project/common';
import { PriorityQueueComponent } from './priority-queue/priority-queue.component';

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
  declarations: [PriorityQueueComponent],
  exports: [PriorityQueueComponent],
  bootstrap: [PriorityQueueComponent]
})
export class QueuePriorityModule {}
