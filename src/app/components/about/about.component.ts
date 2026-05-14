import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
import { PortfolioModel } from '../../models/portfolio-model';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit {
  private portfolioService = inject(PortfolioService);
  portfolio: PortfolioModel | null = null;
  isLoading = true;
  error = '';

  ngOnInit() {
  this.portfolioService.getPortfolio().subscribe({
    next: (data) => {
      this.portfolio = data;
      this.isLoading = false;
    },
    error: () => {
      this.error = 'No se pudieron cargar los datos';
      this.isLoading = false;
    }
  });
}
}
