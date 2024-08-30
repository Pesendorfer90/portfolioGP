import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-arrow',
  standalone: true,
  imports: [],
  templateUrl: './arrow.component.html',
  styleUrl: './arrow.component.scss'
})
export class ArrowComponent {
  @Input() arrowTriggerSkill: boolean = true;
  @Input() arrowTriggerProject: boolean = true;
  @Input() arrowTriggerContact: boolean = true;
  @Input() position: string = 'right';
}