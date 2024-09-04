import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TouchDetectionService {

  constructor() { }

  isTouchDevice(): boolean {
    return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0));
  }
}
