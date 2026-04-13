import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth-service';

@Component({
  selector: 'app-login-component',
  standalone: false,
  templateUrl: './login-component.html',
  styleUrl: './login-component.css'
})
export class LoginComponent {
  
 username = '';
 password = '';
 errorMessage: string = '';
 sucessMessage: string = '';


constructor(private authService: AuthService, private router : Router) {}
isLoggedIn: boolean = false;

onLogin(): void {
  this.authService.login(this.username, this.password).subscribe({
  next: (response) => {
  
  const token = (response as any).token;

   localStorage.setItem('JWT_Token', token);


  this.errorMessage = '';
  this.sucessMessage = 'Login successful! Redirecting...';
    this.router.navigate(['/dashboard'],{
      queryParams : {username :this.username}
  }); 
  this.isLoggedIn = true;
 return true;

 },
 error: (error) => {
 if (error.status === 401) {
   this.errorMessage = 'Invalid username or password.';
   } 
   else if (error.status === 403) {
    this.errorMessage = 'Access denied. Invalid token.';
  }
   else {
    this.errorMessage = 'An unexpected error occurred.';
  }
 }
 });
}

logout(): void {
    localStorage.removeItem('JWT_Token');
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

onClickRegister() {
 setTimeout(() => {
  this.router.navigate(['/register']); 
 }, 1000);

}

}
