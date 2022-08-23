import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  isLoginMode = true;
  authForm!: FormGroup;
  errorMessage = '';

  constructor(private localStorageService: LocalStorageService,private route:Router) {}

  ngOnInit(): void {
    this.localStorageService.error.subscribe((res) => {
      this.errorMessage = res;
    });
    this.authForm = new FormGroup({
      username: new FormControl(null,[Validators.required,Validators.minLength(4), Validators.maxLength(10)]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }

    if (!this.isLoginMode) {
      this.localStorageService.signup(this.authForm.value);
    } else {
      this.localStorageService.login(this.authForm.value);
    }

    if(!this.errorMessage){
      this.route.navigate(['/'])
    }
    this.authForm.reset();
  }




  deleteError() {
    this.errorMessage = '';
  }
}
