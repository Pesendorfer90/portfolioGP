import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollbarService {
  scrollBarStatus: boolean = true || false;
  /** The scrollbarStatus function checks if the current window displays a vertical scrollbar and updates
   * a property, scrollBarStatus, accordingly. It sets scrollBarStatus to true if the scrollbar is visible
   * (i.e., the content is wider than the visible viewport, requiring a scrollbar) and false if the scrollbar is
   * not present. 
   */
  scrollbarStatus() {
    this.scrollBarStatus = window.innerWidth > document.documentElement.clientWidth;
  }
}
