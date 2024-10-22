import { ViewportScroller } from '@angular/common';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

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

  scrollToAnchor(fragment: string): void {
    const element = document.getElementById(fragment);
    if (element) {
      const yOffset = 90;
      const yPosition = element.getBoundingClientRect().top + window.pageYOffset - yOffset;
      window.scrollTo({ top: yPosition, behavior: 'smooth' });
    }
  }
}
