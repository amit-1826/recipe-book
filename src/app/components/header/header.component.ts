import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../modules/auth/auth.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/appReducer';
import { map } from 'rxjs/operators';
import * as AuthActions from '../../modules/auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  userSubscription: Subscription;
  constructor(private dataStorageService: DataStorageService,
    private store: Store<AppState>,
    private authService: AuthService) { }

  ngOnInit() {

    this.userSubscription = this.store.select('auth').pipe(map(authState => { return authState.user })).subscribe((user) => {
      this.isAuthenticated = !!user;   // can also be written as:  !user ? false : true
    });

    /* this.userSubscription = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;   // can also be written as:  !user ? false : true
    }); */
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
    // this.authService.logout();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
