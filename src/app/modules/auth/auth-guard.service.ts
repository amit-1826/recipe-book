import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { AuthService } from "./auth.service";
import * as AuthReducer from '../auth/store/auth.reducer';
import { AppState } from "src/app/store/appReducer";

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {

    constructor(private authService: AuthService,
        private store: Store<AppState>,
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select('auth').pipe(take(1), map(authState => { return authState.user }), map(user => {
            // return !!user;
            const isAuth = !!user;
            if (isAuth) {
                return true;
            }
            return this.router.createUrlTree(['/auth']);
        }));
    }

}