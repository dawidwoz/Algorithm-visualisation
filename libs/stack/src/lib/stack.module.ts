import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StackElementComponent } from './stack-element/stack-element.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  imports: [CommonModule, BrowserModule, BrowserAnimationsModule, MatChipsModule],
  declarations: [StackElementComponent],
  exports: [StackElementComponent]
})
export class StackModule {}
