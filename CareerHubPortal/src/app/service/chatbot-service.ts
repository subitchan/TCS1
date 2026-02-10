import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
 
  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiUrl+'/api/chat';

sendMessage(message: string) {
  return this.http.post(this.apiUrl, { messages: [{ role: 'user', content: message }] });
}

}
