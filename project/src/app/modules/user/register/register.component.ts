import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

function passwordValidator(length: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    return control.value.length < length ? {
      'passwordTooShort':
        { requiredLength: length, actualLength: control.value.length }
    } : null;
  };
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user: FormGroup;

  constructor(private auth: AuthenticationService,
    private router: Router,
    private fb: FormBuilder) { }

  get passwordControl(): FormControl {
    return <FormControl>this.user.get('passwordGroup').get('password');
  }


  get confirmPasswordControl(): FormControl {
    return <FormControl>this.user.get('passwordGroup').get('confirmPassword');
  }

  ngOnInit() {
    this.user = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)],
        this.serverSideValidateUsername()],
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, passwordValidator(8)]],
        confirmPassword: ['', Validators.required]
      }, { validator: this.comparePasswords })
    });
  }


  comparePasswords(control: AbstractControl): { 'passwordsDiffer': boolean } {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password.value === confirmPassword.value) {
      return null;
      
    }
    return { 'passwordsDiffer': true };
  }

  onSubmit() {
    this.auth.register(this.user.value.username, this.passwordControl.value).subscribe(val => {
      if (val) {
        this.router.navigate(['/survey']);
      }
    });
  }

  serverSideValidateUsername(): ValidatorFn {
    return (control: AbstractControl):
      Observable<{ [key: string]: any }> => {
      return this.auth.
        checkUserNameAvailability(control.value).map(available => {
          if (available) {
            return null;
          }
          return { userAlreadyExists: true };
        })
    };
  }

}
