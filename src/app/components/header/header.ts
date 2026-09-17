import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../../service/auth-service/auth-service';
import { filter } from 'rxjs';

@Component({
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  logedIn = this.authService.isLoggedIn();
}
