import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollbarService {
  scrollBarStatus: boolean = true || false;

  scrollbarStatus() {
    this.scrollBarStatus = window.innerWidth > document.documentElement.clientWidth;
  }
}
