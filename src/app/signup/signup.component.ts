import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  faEyeSlash = faEyeSlash;
  faEye = faEye;

  isPasswordHide = true;
  isPasswordConfirmHide = true;

  errorMessage = '';
  signUpForm!: FormGroup;

  subscription = new Subscription();
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.localStorageService.error.subscribe((error) => {
        this.errorMessage = error;
      })
    );

    this.signUpForm = new FormGroup(
      {
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
        confirmPassword: new FormControl(null, Validators.required),
      },
      { validators: this.confirmValidator }
    );
  }

  onSubmit() {
    if (this.signUpForm.invalid) {
      return;
    }
    this.localStorageService.signup(this.signUpForm.value);

    if (!this.errorMessage) {
      this.router.navigate(['/']);
    }
  }

  get username() {
    return this.signUpForm.get('username');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  confirmValidator(control: AbstractControl): ValidationErrors | null {
    const pass = control.get('password');
    const conf = control.get('confirmPassword');
    return pass && conf && pass.value === conf.value
      ? null
      : { confirmValidator: true };
  }

  togglePasswordVisibility() {
    this.isPasswordHide = !this.isPasswordHide;
  }

  togglePasswordConfirmVisibility() {
    this.isPasswordConfirmHide = !this.isPasswordConfirmHide;
  }

  deleteErrorMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
