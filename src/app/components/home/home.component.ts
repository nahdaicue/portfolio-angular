import { Component, inject, OnInit } from '@angular/core';
import { AboutComponent } from '../about/about.component';
import { ProjectsComponent } from '../projects/projects.component';
import { ContactComponent } from '../contact/contact.component';
import { PortfolioModel } from '../../models/portfolio-model';
import { PortfolioService } from '../../services/portfolio.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [AboutComponent, ProjectsComponent, ContactComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
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
        this.error = 'Error al cargar los datos';
        this.isLoading = false;
      },
    });
  }
}
