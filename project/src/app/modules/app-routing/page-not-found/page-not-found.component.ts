import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../user/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private auth:AuthenticationService,
  private router:Router) { }

  ngOnInit() {
  }

  goHome() {
    if (this.auth.user$.value) {
      this.router.navigate(['/survey']);
    } else {
      this.router.navigate(['/home']);
    }
  }

}
