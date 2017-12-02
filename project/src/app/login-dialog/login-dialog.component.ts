import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AuthenticationService } from '../modules/user/authentication.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {
  username: string;
  password: string;
  errorMessage: string;

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>,
    private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
  }

  login(form: NgForm) {
    if (form.valid) {
      this.authService.login(this.username, this.password).subscribe(val => {
        if (val) {
          this.dialogRef.close();
        }
      }, err => this.errorMessage = err.error.message);
    }
  }

  registerClick() {
    this.dialogRef.close();
    this.router.navigate(['/register']);
  }
}
