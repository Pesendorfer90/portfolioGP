import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VisibilityCheckService {
  /**
   * The isScrolledIntoView function determines whether a specific HTML element (referred to as div)
   * is currently visible within the browser's viewport. 
   * It returns true if the element is fully visible at the bottom edge of the viewport and false if the element is either partially or completely outside the visible area.
   *
   * @param {ElementRef<HTMLElement>} div - The DOM element to be checked for visibility in the viewport.
   * @returns {boolean} - The function returns a boolean value:
   * true: If the bottom of the specified div element is visible within the browser's viewport.
   * false: If the element is null/undefined, or its bottom edge is outside the viewport.
   */
  isScrolledIntoView(div: ElementRef<HTMLElement>): boolean {
    if (div) {
      const rect = div.nativeElement.getBoundingClientRect();
      const bottomShown = rect.bottom + 100 <= window.innerHeight && rect.bottom >= 0;
      return bottomShown;
    } else {
      return false;
    }
  }
}