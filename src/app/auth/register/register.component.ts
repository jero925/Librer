import { Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { RegisterForm, RegisterResults } from '../../core/interfaces/register';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: '../login/login.component.css'
})
export class RegisterComponent {

  hiddenPassword: boolean = true;
  hiddenConfirmPassword: boolean = true;

  passwordOk = signal<boolean>(true)

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private matSnackBar: MatSnackBar) { };

  public loginResults$!: Observable<RegisterResults>;
  public registerForm = this.formBuilder.group(
    {
      user: ['', Validators.required],
      fullname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }
  );

  hidePassword() {
    this.hiddenPassword = !this.hiddenPassword;
  }

  hideConfirmPassword() {
    this.hiddenConfirmPassword = !this.hiddenConfirmPassword;
  }

  register(){
    if (this.registerForm.invalid) return
    if (!this.passwordMatch(this.registerForm.value.password, this.registerForm.value.confirmPassword)) {
      this.registerForm.patchValue({
        confirmPassword: '',
      });
      this.passwordOk.set(false)
      return
    }

    const registerForm: RegisterForm = {
      user: this.registerForm.value.user,
      fullname: this.registerForm.value.fullname,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword,
    }

    this.authService.register(registerForm).subscribe({
      next: (response) => {
        console.log(response);
        

        if (response) {
          this.matSnackBar.open('Usuario creado exitosamente', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
          });
          this.router.navigate(['/login'])
        }
      },
      error: (err: HttpErrorResponse) => {
        if (err!.status === 400) {
          console.log(err!.error);
          this.matSnackBar.open('Error de validación', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
          });
        }
      }
    })
  }

  private passwordMatch(password, confirmPassword): boolean {
    return password == confirmPassword
  }
}
