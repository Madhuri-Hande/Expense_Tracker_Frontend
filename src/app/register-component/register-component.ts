
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth-service';

@Component({
  selector: 'app-register-component',
  standalone: false,
  templateUrl: './register-component.html',
  styleUrls: ['./register-component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  username: string = '';
  password: string = '';
  email: string = '';
  message: string = '';
  error: string = '';

  constructor(private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onRegister(): void {
    this.submitted = true;


  if (this.registerForm.invalid) {
    return;
  }


 const { username, email, password } = this.registerForm.value;

  this.authService.register(username, email, password).subscribe({
  next: (response) => {
    this.message = 'Registration successful!';
    this.error = '';
    this.registerForm.reset();
    this.submitted = false;
  },
  error: (err) => {
    this.error = 'Registration failed. Please try again.';
    this.message = '';
  }
});
}
}

