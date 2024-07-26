import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Email } from 'src/app/models/email.model';
import { GlobalVariables } from '../../common/global-variables';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss'],
})
export class ForgotpasswordComponent implements OnInit {
  public resetForm!: FormGroup;
  public isEmailExist: boolean = false;
  public isEmailNotFound: boolean = false;
  public isServerError: boolean = false;
  public errorMessage: string = '';

  constructor(
    private _router: Router,
    private fb: FormBuilder,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.pattern(GlobalVariables.emailPattern)],
      ],
    });
  }

  public goToLogin() {
    this._router.navigate(['/login']);
  }

  public onSubmit(formData: Email) {
    this.isEmailNotFound = false;
    this.isServerError = false;

    this.loginService.resetPassword(formData).subscribe({
      next: () => {
        this.isEmailExist = true;
        setTimeout(() => this.goToLogin(), 5000);
      },
      error: (err) => {
        if (err.status === 404) {
          this.isEmailNotFound = true;
          this.errorMessage = 'Email not found in the database !';
        } else {
          this.isServerError = true;
          this.errorMessage =
            'There is some problem with the server. Please try again later.';
        }
      },
    });
  }
}
