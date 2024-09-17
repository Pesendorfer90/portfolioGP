import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TouchDetectionService {
  /**
   * The isTouchDevice function is used to determine if the current device supports touch input.
   * It checks the browser environment for specific properties that indicate the presence of touch support
   * and returns true if the device is a touch-enabled device (e.g., smartphone or tablet) and false otherwise.
   *
   * @returns {boolean} - The function returns a boolean value:
   *true: If the current device supports touch input.
   *false: If the current device does not support touch input.
   */
  isTouchDevice(): boolean {
    return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0));
  }
}
