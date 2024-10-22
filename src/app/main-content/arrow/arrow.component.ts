import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-arrow',
  standalone: true,
  imports: [],
  templateUrl: './arrow.component.html',
  styleUrl: './arrow.component.scss'
})
export class ArrowComponent {
  @Input() arrowTriggerSkill: boolean = false;
  @Input() arrowTriggerProject: boolean = false;
  @Input() arrowTriggerContact: boolean = false;
  @Input() position: string = 'right' || 'left';
}