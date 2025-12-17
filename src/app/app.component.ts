import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { AboutComponent } from "./components/about/about.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, AboutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio-app';
}
