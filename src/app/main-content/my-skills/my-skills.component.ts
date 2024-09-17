import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';
import { VisibilityCheckService } from '../../service/visibility-check.service';

@Component({
  selector: 'app-my-skills',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './my-skills.component.html',
  styleUrl: './my-skills.component.scss'
})
export class MySkillsComponent {
  @ViewChild('skill', { static: false })
  monitoredDiv?: ElementRef<HTMLDivElement>;
  @Output() skillElement = new EventEmitter<boolean>();


  constructor(public visibilityCheckService: VisibilityCheckService) { }

  /** 
   * @HostListener scroll - Listens to the window scroll event.
   * @HostListener resize - Listens to the window resize event.
   * This method checks if the monitored element is scrolled into view and emits the result.
   */
  @HostListener('window:scroll', ['$event'])
  @HostListener('window:resize', ['$event'])
  onWindowChange() {
    this.skillElement.emit(this.visibilityCheckService.isScrolledIntoView(this.monitoredDiv!))
  }
}
