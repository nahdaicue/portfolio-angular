import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PortfolioModel } from '../models/portfolio-model';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {

  private readonly API_URL = 'http://localhost:8080';
  private http = inject(HttpClient);

  private portfolioSubject = new BehaviorSubject<PortfolioModel | null>(null);
  portfolio$ = this.portfolioSubject.asObservable();

  getPortfolio(): Observable<PortfolioModel> {
    if (this.portfolioSubject.value) {
      return this.portfolio$ as Observable<PortfolioModel>;
    }

    return this.http.get<PortfolioModel>(`${this.API_URL}/api/portfolio`).pipe(
      tap(data => this.portfolioSubject.next(data))
    );
  }
}