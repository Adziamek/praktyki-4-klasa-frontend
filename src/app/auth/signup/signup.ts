import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth-service';

@Component({
  imports: [RouterLink, FormsModule],
  selector: 'app-signup',
  styleUrl: './signup.css',
  templateUrl: './signup.html',
})
export class Signup {
  username = '';
  password = '';
  email = '';

  infoMessage = signal('');
  errorMessage = signal('');
  usernameError = signal('');
  passwordError = signal('');
  emailError = signal('');

  constructor(private authService: AuthService) {}

  signup() {
    this.errorMessage.set('');
    this.infoMessage.set('');
    this.usernameError.set('');
    this.passwordError.set('');
    this.emailError.set('');

    if (!this.username || !this.password || !this.email) {
      this.errorMessage.set('Username, password, and email are required.');
      return;
    }

    this.authService.signup(
      this.username,
      this.password,
      this.email
    ).subscribe({
      next: () => {
        this.errorMessage.set('');
        this.infoMessage.set('Signup successful! Please log in.');
      },

      error: (error) => {
        if (error.status === 400 && error.error?.errors) {
          const errors = error.error.errors;

          this.usernameError.set(errors.Username?.[0] ?? '');
          this.passwordError.set(errors.Password?.[0] ?? '');
          this.emailError.set(errors.Email?.[0] ?? '');

          return;
        }

        this.errorMessage.set(error.error?.detail ?? 'Signup failed. Please try again.');
      }
    });
  }
}
