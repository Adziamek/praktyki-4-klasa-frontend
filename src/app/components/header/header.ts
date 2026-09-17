import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth-service/auth-service';
import { NavElement } from '../nav-element/nav-element';
import { Roles } from '../../environments/role/roles';

@Component({
  imports: [RouterLink, NavElement],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  private authService = inject(AuthService);
  private router = inject(Router);
  role: string | null = null;

  isUser() {
      return this.authService.isUser();
  }

  isWarehouseman() {
      return this.authService.isWarehouseman();
  }

  isAdministrator() {
      return this.authService.isAdministrator();
  }

  logout() {
    this.authService.removeToken();
    this.router.navigate(['/login']);
  }
}
