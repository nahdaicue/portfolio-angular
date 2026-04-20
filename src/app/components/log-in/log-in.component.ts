import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-log-in',
  imports: [FormsModule, CommonModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {

  // Variables ligadas a los inputs
  userName = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  private authService = inject(AuthService);
  private router = inject(Router);

  onLogin() {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.userName, this.password).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => {
        this.errorMessage = 'Username o contraseña incorrectos';
        this.isLoading = false;
      }
    });
  }
}