import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormArrayComponent } from './pages/form-array/form-array.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormArrayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'skills-app';
}
