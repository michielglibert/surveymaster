import { Component } from '@angular/core';
import 'rxjs/add/operator/filter';
import { Router, NavigationStart, NavigationEnd, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './modules/user/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private _loading: boolean;

  constructor(private router: Router,
    private route: ActivatedRoute,
    public authService: AuthenticationService) {

    router.events
      .filter(event => event instanceof NavigationStart)
      .subscribe(() => {
        this._loading = true;
      });

    router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe(() => {
        this._loading = false;
      })
  }

  ngOnInit() {

  }

  goHome() {
    if (this.authService.user$.value) {
      this.router.navigate(['/survey']);
    } else {
      this.router.navigate(['/home']);
    }

  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/logout']);
  }

  get loading(): boolean {
    return this._loading;
  }

}
