import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  faEyeSlash = faEyeSlash;
  faEye = faEye;

  loginForm!: FormGroup;
  isPasswordHide = true;
  errorMessage = '';

  private subscription$ = new Subscription();

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription$.add(
      this.localStorageService.errorMessageChanged$.subscribe((error) => {
        this.errorMessage = error;
      })
    );

    this.loginForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.localStorageService.login(this.loginForm.value);

    if (!this.errorMessage) {
      this.router.navigate(['/']);
    }
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  togglePasswordVisibility() {
    this.isPasswordHide = !this.isPasswordHide;
  }

  deleteErrorMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
