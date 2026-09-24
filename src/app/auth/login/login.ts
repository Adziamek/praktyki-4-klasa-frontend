import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth-service/auth-service';
import { InputString } from '../../components/input-string/input-string';
import { InfoErrorBox } from '../../components/info-error-box/info-error-box';

@Component({
  imports: [RouterLink, FormsModule, InputString, InfoErrorBox],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  username = '';
  password = '';

  errorMessage = signal('');

  constructor(private authService: AuthService, private router: Router) {}

 login() {
    if (!this.username || !this.password) {
      this.errorMessage.set('Username and password are required.');
      return;
    }

    this.authService.login(
      this.username,
      this.password
    ).subscribe({
      next: (response) => {
        let token: string = (response as any).token.result; 

        if (token == null) {
          this.errorMessage.set('Invalid username or password');
          return;
        }

        this.errorMessage = signal('');

        this.authService.saveToken(token);

        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
  }
}
