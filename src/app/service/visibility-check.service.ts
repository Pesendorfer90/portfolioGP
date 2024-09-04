import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VisibilityCheckService {

  constructor() { }

  isScrolledIntoView(div: any): boolean {
    if (div) {
      const rect = div.nativeElement.getBoundingClientRect();
      const topShown = rect.top >= 0;
      const bottomShown = rect.bottom <= window.innerHeight;
      console.log(topShown && bottomShown);
      return topShown && bottomShown;
    } else { return false}
  }
}