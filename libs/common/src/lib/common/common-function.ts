import { ComponentRef } from '@angular/core';
import { ElementComponent } from '../element/element.component';

export function setActiveElement(
  elements: ComponentRef<ElementComponent>[],
  instance: ElementComponent,
  keepCurrent: boolean = false
): void {
  for (const stackElement of elements) {
    const currentInstance = stackElement.instance;
    if (currentInstance === instance) {
      currentInstance.active = true;
    } else if (!keepCurrent) {
      currentInstance.active = false;
    }
  }
}
