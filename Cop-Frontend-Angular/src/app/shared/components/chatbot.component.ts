import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService, ChatMessage } from '../../core/services/chatbot.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="chat-container" [class.minimized]="isMinimized">
      <div class="chat-header" (click)="toggleChat()">
        <i class="fas fa-comment"></i>
        <span>Asistente Virtual</span>
        <button class="minimize-btn">
          <i [class]="isMinimized ? 'fas fa-expand' : 'fas fa-compress'"></i>
        </button>
      </div>
      
      <div class="chat-messages" #messageContainer>
        <div *ngFor="let message of messages" 
             [class]="'message ' + message.role">
          <div class="message-content">
            {{ message.content }}
          </div>
          <div class="message-time">
            {{ message.timestamp | date:'shortTime' }}
          </div>
        </div>
      </div>

      <div class="chat-input">
        <input type="text" 
               [(ngModel)]="currentMessage" 
               (keyup.enter)="sendMessage()"
               placeholder="Escribe tu mensaje...">
        <button (click)="sendMessage()">
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .chat-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 350px;
      height: 500px;
      background: white;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .chat-container.minimized {
      height: 60px;
    }

    .chat-header {
      background: #007bff;
      color: white;
      padding: 15px;
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    .chat-header i {
      margin-right: 10px;
    }

    .minimize-btn {
      margin-left: auto;
      background: none;
      border: none;
      color: white;
      cursor: pointer;
    }

    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 15px;
    }

    .message {
      margin-bottom: 15px;
      max-width: 80%;
    }

    .message.user {
      margin-left: auto;
    }

    .message-content {
      padding: 10px;
      border-radius: 10px;
      background: #f0f0f0;
    }

    .message.user .message-content {
      background: #007bff;
      color: white;
    }

    .message-time {
      font-size: 0.8em;
      color: #666;
      margin-top: 5px;
    }

    .chat-input {
      padding: 15px;
      border-top: 1px solid #eee;
      display: flex;
      gap: 10px;
    }

    .chat-input input {
      flex: 1;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      outline: none;
    }

    .chat-input button {
      padding: 10px 15px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    .chat-input button:hover {
      background: #0056b3;
    }
  `]
})
export class ChatbotComponent implements OnInit {
  messages: ChatMessage[] = [];
  currentMessage = '';
  isMinimized = false;

  constructor(private chatbotService: ChatbotService) {}

  ngOnInit() {
    this.chatbotService.getMessages().subscribe(messages => {
      this.messages = messages;
      this.scrollToBottom();
    });
  }

  async sendMessage() {
    if (!this.currentMessage.trim()) return;
    
    await this.chatbotService.sendMessage(this.currentMessage);
    this.currentMessage = '';
  }

  toggleChat() {
    this.isMinimized = !this.isMinimized;
  }

  private scrollToBottom() {
    setTimeout(() => {
      const messageContainer = document.querySelector('.chat-messages');
      if (messageContainer) {
        messageContainer.scrollTop = messageContainer.scrollHeight;
      }
    });
  }
}