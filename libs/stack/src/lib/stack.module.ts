import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StackElementComponent } from './stack-element/stack-element.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [CommonModule, BrowserModule, BrowserAnimationsModule],
  declarations: [StackElementComponent],
  exports: [StackElementComponent]
})
export class StackModule {}
