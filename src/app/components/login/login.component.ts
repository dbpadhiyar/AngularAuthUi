import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helper/validateform';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;

  constructor
    (
      private fb: FormBuilder,
      private auth: AuthService,
      private router: Router,
      private toast: NgToastService,
      private userStore: UserStoreService
    ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  hideShowPassword() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.auth.Login(this.loginForm.value)
        .subscribe({
          next: (res) => {
            this.loginForm.reset();
            this.auth.storeToken(res.token);
            let tokenPayLoad = this.auth.decodedToken();
            this.userStore.seFullNameFromStore(tokenPayLoad.name);
            this.userStore.seRoleFromStore(tokenPayLoad.role);
            this.toast.success({ detail: "SUCCESS", summary: res.message, duration: 5000 })
            this.router.navigate(['dashboard']);
          },
          error: (err) => {
            this.toast.error({ detail: "ERROR", summary: `${err?.error.message}`, duration: 5000 })
          }
        });
    }
    else {
      ValidateForm.validateAllFormFields(this.loginForm);
    }
  }
}
