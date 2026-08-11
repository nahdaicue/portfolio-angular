import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
import { PortfolioModel } from '../../models/portfolio-model';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [CommonModule, RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit {

  private portfolioService = inject(PortfolioService);
  private authService = inject(AuthService);

  portfolio: PortfolioModel | null = null;
  isLoading = true;
  error = '';
  loggedIn$ = this.authService.loggedIn$;

  ngOnInit() {
    this.portfolioService.getPortfolio().subscribe({
      next: (data) => {
        this.portfolio = data;
        this.isLoading = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los datos';
        this.isLoading = false;
      },
    });
  }
}
