import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../classes/user'; 
import { Observable } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = `${environment.apiUrl}/users`;  // Assuming your user APIs are prefixed with /auth

  constructor(private http: HttpClient) {}

  

  //  Get user ID by username
  getUserIdByUsername(username: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/findIdByName/${username}`);
  }

    

 
}
