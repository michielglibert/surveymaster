import { Component } from '@angular/core';
import 'rxjs/add/operator/filter';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { AuthenticationService } from './modules/user/authentication.service';
import { MatDialog } from '@angular/material';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private _loading: boolean;

  constructor(private router: Router,
  private authService:AuthenticationService,
  private dialog: MatDialog) {
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

  logout() {
    this.authService.logout();
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '250px'
    });
  }

  get loading(): boolean {
    return this._loading;
  }

}
