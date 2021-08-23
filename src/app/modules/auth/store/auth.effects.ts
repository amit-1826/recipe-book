import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AppState } from 'src/app/store/appReducer';
import { environment } from 'src/environments/environment';
import * as AuthActions from '../store/auth.actions';

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
    return new AuthActions.AuthenticateSuccess({ email: resData.email, userId: resData.localId, token: resData.idToken, expirationDate: expirationDate })
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
            }).pipe(map((resData) => {
                return handleAuthentication(resData);
            }), catchError((error: any) => {
                return handleError(error);
            }));
        })
    )

    @Effect({ dispatch: false })
    authSuccess = this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS),
        tap((data) => {
            this.router.navigate(['/recipes']);
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
            }).pipe((map((resData) => {
                return handleAuthentication(resData);
            })), catchError((error: any) => {
                return handleError(error);
            }));
        })
    )

    constructor(private actions$: Actions, private http: HttpClient, private store: Store<AppState>, private router: Router) { }
}