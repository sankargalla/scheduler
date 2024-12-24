import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { user } from '../interfaces/auth';
import { Observable } from 'rxjs';
import { Schedule } from '../interfaces/schedule.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private readonly USER_KEY = 'loggedInUser';

  private backendUrl = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  setUser(email: string, password: string): void {
    this.userLogin(email, password).subscribe(
      (user)=>{
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      },
      (error) => {
        console.error('Error fetching user details:',error);
      }
    )
    
  }

  logout(): void {
    this.clearUser();
    window.location.href = '/login';
  }

  clearUser(): void {
    localStorage.removeItem(this.USER_KEY);
  }

  registerUser(userDeatils: user): Observable<any> {
     return this.http.post(`${this.backendUrl}/register`, userDeatils, {headers: { 'Content-Type': 'application/json' }, responseType: 'text'}, );
  }

  userLogin(email: string, password: string): Observable<any> {
    return this.http.post(`${this.backendUrl}/login`, { email, password });
  }

  getSchedule(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${this.backendUrl}/employee/7`);
  }

  getUserByEmail(email: string): Observable<any>{
    return this.http.get<user>(`${this.backendUrl}/user/email/${email}`);
  }

  getLoggedInUser(): user | null {
    const user = localStorage.getItem(this.USER_KEY);
    // console.log(user)
    return user ? JSON.parse(user) : null;
  }
}
