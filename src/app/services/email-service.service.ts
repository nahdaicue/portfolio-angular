import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmailRequest } from '../models/EmailRequest';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private readonly apiUrl = 'http://localhost:8080/email/sendMessage';
  private readonly destinationEmail = 'nahdaicue@gmail.com';

  constructor(private http: HttpClient) {}

  sendContactMessage(
    senderName: string,
    company: string,
    senderEmail: string,
    subject: string,
    messageBody: string
  ): Observable<any> {

    const formattedMessage =
      `Nombre: ${senderName}\n` +
      `Empresa: ${company || 'No especificada'}\n` +
      `Email: ${senderEmail}\n\n` +
      `Mensaje:\n${messageBody}`;

    const payload: EmailRequest = {
      toUser: [this.destinationEmail],
      subject: subject,
      message: formattedMessage
    };

    return this.http.post(this.apiUrl, payload);
  }
}