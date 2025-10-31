import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private apiUrl = `${environment.apiUrl}/notifications`;

  constructor(private http: HttpClient) {}

  sendAppointmentConfirmation(appointment: any) {
    return this.http.post(`${this.apiUrl}/appointment-confirmation`, {
      email: appointment.patientEmail,
      appointment: {
        date: appointment.date,
        time: appointment.time,
        service: appointment.service,
        doctor: appointment.doctor
      }
    });
  }

  sendAppointmentReminder(appointment: any) {
    return this.http.post(`${this.apiUrl}/appointment-reminder`, {
      email: appointment.patientEmail,
      appointment: {
        date: appointment.date,
        time: appointment.time,
        service: appointment.service,
        doctor: appointment.doctor
      }
    });
  }

  sendCustomNotification(to: string, subject: string, message: string) {
    return this.http.post(`${this.apiUrl}/send`, {
      to,
      subject,
      message
    });
  }
}