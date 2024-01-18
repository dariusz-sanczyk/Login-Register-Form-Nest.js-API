import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CustomvalidatorService {
  constructor() {}

  public checkPasswordsMatch(
    password: string,
    confirmPassword: string
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;
      const valueOfPassword = formGroup.get(password)?.value;
      const valueOfConfirmPassword = formGroup.get(confirmPassword)?.value;

      if (valueOfPassword === valueOfConfirmPassword) {
        return null;
      } else {
        formGroup.get(confirmPassword)?.setErrors({ bad: true });
        return { passwordsDoNotMatch: true };
      }
    };
  }
}
