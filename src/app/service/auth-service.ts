import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
 private baseUrl = 'https://localhost:44357/api/ApplicationUser';
 constructor(private http: HttpClient) {}

 login(username: string, password: string) {
 return this.http.post(`${this.baseUrl}/login`, { username, password });
 }
 
 register(username:string , email:string, password :string){
  return this.http.post(`${this.baseUrl}/Register`, { username, email, password });
 }
}
