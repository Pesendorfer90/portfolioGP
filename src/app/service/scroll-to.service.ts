import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollToService {
  /**
   * The scrollToElement function scrolls the browser window smoothly to a specific element on the
   * page, identified by its id. It adjusts the scroll position to ensure that the element is visible with a
   * customizable offset, allowing space above the element (e.g., for sticky headers). This provides a user-
   * friendly, smooth scrolling effect for navigation within a webpage.
   *
   * @param {string} elementId - The id attribute of the DOM element to which the browser window should scroll.
   */
  scrollToElement(elementId: string) {
    let element = document.getElementById(elementId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
}