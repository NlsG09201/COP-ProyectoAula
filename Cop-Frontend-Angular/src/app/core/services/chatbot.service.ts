import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

@Injectable({ providedIn: 'root' })
export class ChatbotService {
  private messages = new BehaviorSubject<ChatMessage[]>([]);
  private readonly OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
  private readonly MODEL = 'gpt-4';

  constructor(private http: HttpClient) {}

  getMessages(): Observable<ChatMessage[]> {
    return this.messages.asObservable();
  }

  async sendMessage(userMessage: string): Promise<void> {
    // Añadir mensaje del usuario
    this.addMessage('user', userMessage);

    try {
      const response = await this.http.post<OpenAIResponse>(this.OPENAI_API_URL, {
        model: this.MODEL,
        messages: [
          {
            role: 'system',
            content: `Eres un asistente virtual de una clínica dental. 
            Puedes ayudar con:
            - Información sobre servicios y precios
            - Programación de citas
            - Preguntas frecuentes sobre tratamientos
            - Recomendaciones de cuidado dental
            Mantén un tono profesional pero amigable.`
          },
          { role: 'user', content: userMessage }
        ],
        temperature: 0.7
      }, {
        headers: {
          'Authorization': `Bearer ${environment.openaiApiKey}`,
          'Content-Type': 'application/json'
        }
      }).toPromise();

      if (response && response['choices'] && response['choices'][0]) {
        const assistantResponse = response['choices'][0]['message']['content'];
        this.addMessage('assistant', assistantResponse);
      }
    } catch (error) {
      console.error('Error al comunicarse con la IA:', error);
      this.addMessage('assistant', 'Lo siento, estoy teniendo problemas para procesar tu solicitud. Por favor, intenta más tarde.');
    }
  }

  private addMessage(role: 'user' | 'assistant', content: string) {
    const currentMessages = this.messages.getValue();
    this.messages.next([
      ...currentMessages,
      { role, content, timestamp: new Date() }
    ]);
  }
}