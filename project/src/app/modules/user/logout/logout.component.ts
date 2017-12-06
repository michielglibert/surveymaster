import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})

//When navigated to this it will logout the user
export class LogoutComponent implements OnInit {

  constructor(private router: Router,
  private auth:AuthenticationService) { }

  ngOnInit() {
    this.auth.logout();
  }

}
