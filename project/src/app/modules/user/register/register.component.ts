import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';

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

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form:NgForm) {
    if (form.valid) {
      
    }
  }

}
