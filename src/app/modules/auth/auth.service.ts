import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/appReducer";
import * as AuthActions from '../auth/store/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {

    // Behaviour subject allows to get data even after the event is not emitted, or 
    // it allows to get data which has been emitted previously i.e. get data on demand, even before emitting
    // while subject will get data whenever event is emitted after subscribe
    // user = new BehaviorSubject<User>(null);
    tokenExpirationTimer: any;

    constructor(private store: Store<AppState>) {
    }

    setExpirationTImer(expirationDuration: number) {
        console.log('expirationDuration: ', expirationDuration);
        this.tokenExpirationTimer = setTimeout(() => {
            this.store.dispatch(new AuthActions.Logout());
        }, expirationDuration);
    }

    clearTimer() {
        if (this.tokenExpirationTimer) {
            clearInterval(this.tokenExpirationTimer);
            this.tokenExpirationTimer = null;
        }
    }
}