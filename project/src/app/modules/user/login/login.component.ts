import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  errorMessage: string;

  constructor(private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
  }

  //Logs the user in, if redirecturl was set it will redirect to that
  login(form: NgForm) {
    if (form.valid) {
      this.authService.login(this.username.toLocaleLowerCase(), this.password).subscribe(val => {
        if (val) {
          if (this.authService.redirectUrl) {
            this.router.navigateByUrl(this.authService.redirectUrl);
            this.authService.redirectUrl = undefined;
          } else {
            this.router.navigate(['/survey']);
          }
        }
      }, err => this.errorMessage = err.error.message);
    }
  }

  //Navigates to register comp
  registerClick() {
    this.router.navigate(['/register']);
  }
}
