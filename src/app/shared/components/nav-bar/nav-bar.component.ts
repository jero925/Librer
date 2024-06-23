import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { LoginService } from '../../../core/services/login.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  constructor(
    private iconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private router: Router,
    private loginService: LoginService
  ) 
  { this.iconRegistry.addSvgIcon('github', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/github.svg')) }

  onClickLogout() {
    localStorage.removeItem('isAuth');
    this.router.navigate(['/login'])
  }

  isLoggedIn(): boolean {
    return this.loginService.isAuth()
  }
}
