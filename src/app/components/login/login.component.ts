import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';
import { ApiAuthService } from 'src/app/services/apiAuth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  loading: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _apiAuthService: ApiAuthService) {

      // If user is logged, redirect
    if (this._apiAuthService.userData && Object.keys(this._apiAuthService.userData).length != 0){
      this._router.navigate(['/dashboard']);
    }
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  signin() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this._apiAuthService.login(email, password).subscribe((response) => {
      if (response.exito === 1) {
        this.fakeLoading();
      } else if (response.exito === 0) {
        console.log(response);
        this.error(response.mensaje);
      }
    });
  }

  error(errorMessage: string) {
    this._snackBar.open(errorMessage, '', {
      horizontalPosition: 'center',
      duration: 3000,
      verticalPosition: 'top',
    });
    // Reset password value
    this.resetFormValues(this.loginForm.value.email, '');
  }

  fakeLoading() {
    this.loading = true;
    setTimeout(() => {
      this.loginForm.reset();
      this._router.navigate(['dashboard']);
    }, 1500);
  }

  resetFormValues(email: string, password: string) {
    this.loginForm.setValue({
      email: email,
      password: password,
    });
  }
}
