import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-nav-element',
  styleUrl: './nav-element.css',
  templateUrl: './nav-element.html',
})
export class NavElement {
  routerLink = input.required<string>();
  navText = input.required<string>();
  condition = input<boolean>(true);
}
