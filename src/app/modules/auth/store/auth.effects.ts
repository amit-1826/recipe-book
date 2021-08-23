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
                const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
                return new AuthActions.Login({ email: resData.email, userId: resData.localId, token: resData.idToken, expirationDate: expirationDate })
            }), catchError((error: any) => {
                return of(new AuthActions.LoginFail(error));
            }));
        })
    )

    @Effect({ dispatch: false })
    loginSuccess = this.actions$.pipe(
        ofType(AuthActions.LOGIN),
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
                console.log('after sign up success', resData);
                const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
                return new AuthActions.SignUpSuccess({ email: resData.email, userId: resData.localId, token: resData.idToken, expirationDate: expirationDate })
            })), catchError((error: any) => {
                console.log('error in signup: ', error);
                return of(new AuthActions.SignUpFail(error));
            }));
        })
    )

    @Effect({ dispatch: false })
    signUpSuccess = this.actions$.pipe(
        ofType(AuthActions.SIGN_UP_SUCCESS),
        tap((data) => {
            console.log('after sign up success: ', data);
            this.router.navigate(['/recipes']);
        })
    )

    constructor(private actions$: Actions, private http: HttpClient, private store: Store<AppState>, private router: Router) { }
}