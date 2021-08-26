import { Component, OnInit } from '@angular/core';
import { AuthService } from './modules/auth/auth.service';
import * as fromApp from '../app/store/appReducer';
import { Store } from '@ngrx/store';
import * as AuthActions from '../app/modules/auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService,
    private store: Store<fromApp.AppState>) {

  }

  ngOnInit() {
    // this.authService.autoLogin();

    this.store.dispatch(new AuthActions.AutoLogin());
  }

}
