import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
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
              @Inject(PLATFORM_ID) private platFormId,
              private store: Store<fromApp.AppState>) {

  }

  ngOnInit() {
    if (isPlatformBrowser(this.platFormId)) {
      this.store.dispatch(new AuthActions.AutoLogin());
    }
    console.log('inside app component');
  }

}
