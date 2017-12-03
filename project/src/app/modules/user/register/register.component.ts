import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public username:string;
  public email:string;
  public password:string;
  public passwordRepeat:string;

  constructor(private auth:AuthenticationService,
  private router:Router) { }

  ngOnInit() {
  }

  onSubmit(form:NgForm) {
    if (form.valid) {
      this.auth.register(this.username, this.password).subscribe(succes => {
        this.router.navigate(['/survey']);
      })
      
    }
  }

}
