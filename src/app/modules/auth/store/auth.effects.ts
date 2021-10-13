import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AppState } from 'src/app/store/appReducer';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import * as AuthActions from '../store/auth.actions';
import { User } from '../user.model';

interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

const API_KEY = environment.authKey;

const handleAuthentication = (resData: any) => {
    const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
    const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));
    return new AuthActions.AuthenticateSuccess({ email: resData.email, userId: resData.localId, token: resData.idToken, expirationDate, redirect: true });
};

const handleError = (error) => {
    return of(new AuthActions.AuthError(error));
};

@Injectable()
export class AuthEffect {
    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + API_KEY, {
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true
            }).pipe(
                tap((resData) => {
                    this.authService.setExpirationTImer(+resData.expiresIn * 1000);
                }),
                map((resData) => {
                    return handleAuthentication(resData);
                }), catchError((error: any) => {
                    return handleError(error);
                }));
        })
    )

    @Effect({ dispatch: false })
    authRedirect = this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS),
        tap((data: AuthActions.AuthenticateSuccess) => {
            if (data.payload.redirect) {
                this.router.navigate(['/']);
            }
        })
    )

    @Effect({ dispatch: false })
    authLogout = this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap((data) => {
            this.authService.clearTimer();
            localStorage.removeItem('userData');
            this.router.navigate(['/auth']);
        })
    )

    @Effect()
    autoLogin = this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map((data) => {
            const userData: {
                email: string,
                userId: string,
                _token: string,
                _expirationDate: string
            } = JSON.parse(localStorage.getItem('userData'));
            if (!userData) {
                return { type: 'DUMMY' };
            }
            const expirationDuration = new Date(userData._expirationDate).getTime() - new Date().getTime();
            this.authService.setExpirationTImer(expirationDuration);
            return new AuthActions.AuthenticateSuccess({ email: userData.email, userId: userData.userId, token: userData._token, expirationDate: new Date(userData._expirationDate), redirect: false });
        })
    )

    @Effect()
    signUpStart = this.actions$.pipe(
        ofType(AuthActions.SIGN_UP_START),
        switchMap((signUpData: AuthActions.SignUpStart) => {
            return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_KEY, {
                email: signUpData.payload.email,
                password: signUpData.payload.password,
                returnSecureToken: true
            }).pipe(
                tap((resData) => {
                    this.authService.setExpirationTImer(+resData.expiresIn * 1000);
                }),
                map((resData) => {
                    return handleAuthentication(resData);
                }), catchError((error: any) => {
                    return handleError(error);
                }));
        })
    )

    constructor(private actions$: Actions, private http: HttpClient, private store: Store<AppState>, private router: Router, private authService: AuthService) { }
}
