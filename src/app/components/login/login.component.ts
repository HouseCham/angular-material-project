import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading: boolean = false;

  constructor(
    private _fb:FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router){
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  signin(){
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    if (email === 'test2@gmail.com' && password === 'test2'){
      this.fakeLoading();
    } else{
      this.error();
    }
  }

  error(){
    this._snackBar.open('Incorrect user or password', '', {
      horizontalPosition: 'center',
      duration: 3000,
      verticalPosition: 'top'
    });
    // Reset password value
    this.resetFormValues(this.loginForm.value.email, '');
  }

  fakeLoading(){
    this.loading = true;
    setTimeout(() => {
      this.loginForm.reset();
      this._router.navigate(['dashboard']);
    }, 1500);
  }

  resetFormValues(email: string, password: string){
    this.loginForm.setValue({
      email: email,
      password: password
    });
  }
}
