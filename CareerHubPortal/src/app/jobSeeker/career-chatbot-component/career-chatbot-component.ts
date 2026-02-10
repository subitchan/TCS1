import { Component, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { ChatbotService } from '../../service/chatbot-service';
import { JobSeekerService } from '../../service/job-seeker';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-career-chatbot-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './career-chatbot-component.html',
  styleUrls: ['./career-chatbot-component.css']
})
export class CareerChatbotComponent  {
  @ViewChild('chatContainer') container!: ElementRef;
  @ViewChild('resizeHandle') resizeHandle!: ElementRef;

  inputMessage = '';
  messages: { sender: 'user' | 'ai'; text: string }[] = [];
  isOpen = false;
  loading = false;
  coverLetterDisabled = false;

 
  private lastWidth = 380; // default width
  private lastHeight = 600; // default height

  constructor(
    private chatbotService: ChatbotService,
    private jobSeekerService: JobSeekerService
  ) {}

  

  toggleChat() {
    this.isOpen = !this.isOpen;
    const container = this.container.nativeElement;
    if (this.isOpen) {
      container.style.width = `${this.lastWidth}px`;
      container.style.height = `${this.lastHeight}px`;
    } else {
      container.style.width = '250px';
      container.style.height = '65px';
    }
  }

  sendMessage() {
    const msg = this.inputMessage.trim();
    if (!msg) return;

    this.messages.push({ sender: 'user', text: msg });
    this.inputMessage = '';
    this.loading = true;

    this.chatbotService.sendMessage(msg).subscribe({
      next: (res: any) => {
        const reply = res.choices[0]?.message?.content || 'No response';
        this.messages.push({ sender: 'ai', text: reply });
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.messages.push({ sender: 'ai', text: 'Error contacting Gemini API.' });
        this.loading = false;
      }
    });
  }

  clearChat() {
    this.messages = [];
    this.inputMessage = '';
  }

  generateCoverLetter() {
    const profileId = localStorage.getItem('profileId');
    if (!profileId) return alert('No profile ID found in local storage!');

    this.loading = true;
    this.coverLetterDisabled = true;

    this.jobSeekerService.getJobSeekerById(+profileId).subscribe({
      next: (user) => {
        if (!user) {
          this.messages.push({ sender: 'ai', text: 'No job seeker info found.' });
          this.resetLoading();
          return;
        }

        const prompt = `Write a professional cover letter for ${user.fullName}.
Skills: ${user.skills}.
Education summary: ${user.education}.
Make it confident and concise.`;

        this.messages.push({ sender: 'user', text: '📝 Write a cover letter for me' });

        this.chatbotService.sendMessage(prompt).subscribe({
          next: (res: any) => {
            const reply = res.choices[0]?.message?.content || 'No response from AI.';
            this.messages.push({ sender: 'ai', text: reply });
            this.resetLoading();
          },
          error: (err) => {
            console.error(err);
            this.messages.push({ sender: 'ai', text: 'Error generating cover letter.' });
            this.resetLoading();
          }
        });
      },
      error: (err) => {
        console.error(err);
        this.messages.push({ sender: 'ai', text: 'Error fetching job seeker info.' });
        this.resetLoading();
      }
    });
  }

  private resetLoading() {
    this.loading = false;
    this.coverLetterDisabled = true;
  }
}
