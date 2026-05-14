import { Component, inject, OnInit } from '@angular/core';
import { PortfolioModel } from '../../models/portfolio-model';
import { PortfolioService } from '../../services/portfolio.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit{
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
      },
    });
  }
}
