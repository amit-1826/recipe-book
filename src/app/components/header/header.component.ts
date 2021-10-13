import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/appReducer';
import { map } from 'rxjs/operators';
import * as AuthActions from '../../modules/auth/store/auth.actions';
import * as RecipeActions from '../../modules/recipes/store/recipes.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  userSubscription: Subscription;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {

    this.userSubscription = this.store.select('auth').pipe(map(authState => { return authState.user })).subscribe((user) => {
      this.isAuthenticated = !!user;   // can also be written as:  !user ? false : true
    });

    /* this.userSubscription = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;   // can also be written as:  !user ? false : true
    }); */
  }

  onSaveData() {
    this.store.dispatch(new RecipeActions.StoreRecipe());
    // this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    // this.dataStorageService.fetchRecipes().subscribe();
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
    // this.authService.logout();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
