import { Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginForm, LoginResults } from '../../core/interfaces/login';
import { AuthService } from '../../core/services/auth.service';
import { Observable } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  hiddenPassword: boolean = true;

  constructor(private formBuilder: FormBuilder, private AuthService: AuthService, private router: Router) { };

  public loginResults$!: Observable<LoginResults>;

  public loginForm = this.formBuilder.group({
    user: ['', Validators.required],
    password: ['', Validators.required]
  });

  hidePassword(): void {
    this.hiddenPassword = !this.hiddenPassword;
  }

  login() {
    if (this.loginForm.invalid) return

    const loginForm: LoginForm = {
      user: this.loginForm.value.user,
      password: this.loginForm.value.password
    }

    this.AuthService.login(loginForm.user, loginForm.password).subscribe({
      next: (data) => {
        if (data.exists) {
          console.log(data);
          localStorage.setItem('isAuth', 'true')
          this.router.navigate(['pokedex'])
        } else {
          alert("Credenciales son incorrectas");
          this.loginForm.patchValue({
            password: '',
          });
        }
      },
      error: (error) => {
        console.log(error.message);
      }
    })
  }
}