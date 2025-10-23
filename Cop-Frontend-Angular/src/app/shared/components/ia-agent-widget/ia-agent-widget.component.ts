import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

interface Message { role: 'user' | 'assistant'; text: string; }

@Component({
  selector: 'app-ia-agent-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styles: [`
    .widget { position: fixed; bottom: 20px; right: 20px; z-index: 1000; }
    .panel { width: 320px; background: #fff; border-radius: 10px; box-shadow: 0 8px 24px rgba(0,0,0,0.18); overflow: hidden; }
    .header { display:flex; justify-content:space-between; align-items:center; padding:10px 12px; background:#2563eb; color:#fff; }
    .messages { max-height: 300px; overflow-y: auto; padding: 10px; }
    .msg { margin-bottom: 8px; }
    .msg.assistant { text-align: left; }
    .msg.user { text-align: right; }
    .input { display:flex; gap:8px; padding: 10px; border-top: 1px solid #eee; }
    .toggle { background:#2563eb; color:#fff; border:none; border-radius:999px; padding:12px 16px; font-weight:600; }
  `],
  template: `
    <div class="widget">
      <button class="toggle" (click)="open = !open">{{ open ? 'Cerrar' : 'Chat IA' }}</button>
      <div class="panel" *ngIf="open">
        <div class="header">
          <span>Asistente IA</span>
          <button (click)="messages=[]" aria-label="Limpiar chat">↻</button>
        </div>
        <div class="messages" aria-live="polite">
          <div *ngFor="let m of messages" class="msg" [class.assistant]="m.role==='assistant'" [class.user]="m.role==='user'">
            <small><strong>{{m.role==='assistant'?'IA':'Tú'}}:</strong></small>
            <div>{{m.text}}</div>
          </div>
        </div>
        <form class="input" (ngSubmit)="send()">
          <input type="text" [(ngModel)]="input" name="input" class="flex-1 border rounded px-2 py-1" placeholder="Escribe tu consulta..." required />
          <button type="submit" class="toggle">Enviar</button>
        </form>
      </div>
    </div>
  `
})
export class IaAgentWidgetComponent {
  open = false;
  input = '';
  messages: Message[] = [
    { role: 'assistant', text: 'Hola, soy tu asistente. ¿Cómo puedo ayudarte?' }
  ];
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  send(){
    const text = this.input.trim();
    if(!text) return;
    this.messages.push({ role: 'user', text });
    this.input = '';
    this.http.post<{reply:string}>(`${this.baseUrl}/ai/chat`, { message: text }).subscribe({
      next: (resp) => this.messages.push({ role: 'assistant', text: resp.reply }),
      error: () => this.messages.push({ role: 'assistant', text: 'Lo siento, hubo un problema procesando tu solicitud.' })
    });
  }
}