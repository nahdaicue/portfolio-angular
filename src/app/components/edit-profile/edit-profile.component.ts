import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { PortfolioService } from '../../services/portfolio.service';
import { AuthService } from '../../services/auth.service';
import { PortfolioModel } from '../../models/portfolio-model';
import { ProfileUpdateModel } from '../../models/profile-update-model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent implements OnInit {
  private fb = inject(FormBuilder);
  private portfolioService = inject(PortfolioService);
  private authService = inject(AuthService);
  private router = inject(Router);

  portfolio: PortfolioModel | null = null;
  profileForm!: FormGroup;

  isLoading = true;
  isSaving = false;
  error: string | null = null;
  successMsg: string | null = null;

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.portfolioService.getPortfolio().subscribe({
      next: (data) => {
        this.portfolio = data;
        this.buildForm();
        this.isLoading = false;
      },
      error: () => {
        this.error = 'No se pudo cargar el perfil.';
        this.isLoading = false;
      },
    });
  }

  private buildForm(): void {
    this.profileForm = this.fb.group({
      username: [
        this.portfolio?.profile.username,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(80),
        ],
      ],
      title: [
        this.portfolio?.profile.title,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(120),
        ],
      ],
      description: [
        this.portfolio?.profile.description,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(500),
        ],
      ],
      aboutMe: [
        this.portfolio?.profile.aboutMe,
        [
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(2000),
        ],
      ],
      urlImg: [
        this.portfolio?.profile.urlImg,
        [Validators.required, Validators.pattern('https?://.+')],
      ],
    });
  }

  get f() {
    return this.profileForm.controls;
  }

  onSubmit(): void {
  if (this.profileForm.invalid) {
    this.profileForm.markAllAsTouched();
    return;
  }

  this.isSaving = true;
  this.error = null;
  this.successMsg = null;

  const dto: ProfileUpdateModel = {
    username: this.f['username'].value,
    title: this.f['title'].value,
    description: this.f['description'].value,
    aboutMe: this.f['aboutMe'].value,
    urlImg: this.f['urlImg'].value,
  };

  this.portfolioService
    .updateProfile(this.portfolio!.user.id, dto)
    .pipe(
      finalize(() => {
        this.isSaving = false;
      })
    )
    .subscribe({
      next: (response) => {
        console.log('✅ Guardado OK:', response);
        this.successMsg = '✅ Perfil actualizado correctamente.';
        this.portfolioService.clearCache();

        // Navegar después de 1.5 segundos
        setTimeout(() => {
          console.log('➡️ Navegando a home...');
          this.router.navigate(['/']);
        }, 1500);
      },
      error: (err) => {
        console.error('❌ Error al guardar:', err);
        this.error = '❌ Error al guardar los cambios. Intentá de nuevo.';
      },
    });
}

  onCancel(): void {
    this.router.navigate(['/']);
  }
}
