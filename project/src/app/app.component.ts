import { Component } from '@angular/core';
import 'rxjs/add/operator/filter';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private _loading: boolean;

  constructor(private router: Router) {
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

  get loading(): boolean {
    return this._loading;
  }

}
