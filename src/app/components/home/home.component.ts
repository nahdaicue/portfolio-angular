import { Component } from '@angular/core';
import { AboutComponent } from "../about/about.component";

@Component({
  selector: 'app-home',
  imports: [AboutComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
