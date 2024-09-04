import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shared/footer/footer.component";
import { NavbarComponent } from './shared/navbar/navbar.component';
import { TouchDetectionService } from './service/touch-detection.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'protfolioGP';

  isTouchDevice: boolean = false;

  constructor(private touchDetectionService: TouchDetectionService) { }

  ngOnInit(): void {
    this.isTouchDevice = this.touchDetectionService.isTouchDevice();
    console.log(this.isTouchDevice, "touch");
  }
}
