import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailService } from '../../services/email-service.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  contactForm: FormGroup;
  sending = false;
  sent = false;
  errorMsg = '';

  constructor(private fb: FormBuilder, private emailService: EmailService) {
    this.contactForm = this.fb.group({
      senderName: ['', [Validators.required, Validators.maxLength(50)]],
      company: ['', [Validators.maxLength(50)]],
      senderEmail: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
      subject: ['', [Validators.required, Validators.maxLength(150)]],
      messageBody: ['', [Validators.required, Validators.maxLength(3000)]]
    });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const { senderName, company, senderEmail, subject, messageBody } = this.contactForm.value;

    this.sending = true;
    this.errorMsg = '';

    this.emailService.sendContactMessage(senderName, company, senderEmail, subject, messageBody)
      .subscribe({
        next: () => {
          this.sending = false;
          this.sent = true;
          this.contactForm.reset();
        },
        error: (err) => {
          this.sending = false;
          this.errorMsg = 'Ocurrió un error al enviar el mensaje. Intentá de nuevo.';
          console.error(err);
        }
      });
  }
}