import { ViewportScroller } from '@angular/common';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  /**
 * Initializes the component, sets up scroll restoration, and subscribes to router events.
 *
 * @param {Router} router - The Angular Router instance used for navigation.
 * @param {ViewportScroller} viewportScroller - The Angular ViewportScroller service used for scrolling.
 *
 * The constructor performs the following tasks:
 * - Sets the scroll restoration behavior to 'auto' using `viewportScroller.setHistoryScrollRestoration('auto')`.
 * - Subscribes to router events to detect when navigation ends (`NavigationEnd`).
 *   - If the URL contains a fragment, it waits 100 milliseconds and then calls `scrollToAnchor` to scroll to the specified anchor.
 *   - If no fragment is present, it scrolls to the top of the page `[0, 0]`.
 */
  constructor(private router: Router, private viewportScroller: ViewportScroller) {
    this.viewportScroller.setHistoryScrollRestoration('auto');
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const fragment = this.router.parseUrl(this.router.url).fragment;
        if (fragment) {
          setTimeout(() => {
            this.scrollToAnchor(fragment);
        }, 100)
        } else {
          this.viewportScroller.scrollToPosition([0, 0]);
        }
      }
    });
  }

  /**
 * Smoothly scrolls the page to the specified anchor element.
 *
 * @param {string} fragment - The ID of the element to scroll to.
 *
 * The function retrieves the element with the given ID (`fragment`). If the element exists, it calculates its
 * vertical position on the page, considering an offset of 90 pixels (`yOffset`) from the top. It then scrolls
 * to this position smoothly using the `window.scrollTo` method with `behavior: 'smooth'`.
 */
  scrollToAnchor(fragment: string): void {
    const element = document.getElementById(fragment);
    if (element) {
      const yOffset = 90;
      const yPosition = element.getBoundingClientRect().top + window.pageYOffset - yOffset;
      window.scrollTo({ top: yPosition, behavior: 'smooth' });
    }
  }
}
