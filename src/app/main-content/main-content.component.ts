import { Component } from '@angular/core';
import { LandinPageComponent } from './landin-page/landin-page.component';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [LandinPageComponent,
    
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {

}
