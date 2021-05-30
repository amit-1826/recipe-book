import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { User } from "./user.model";

interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

const API_KEY = environment.authKey;

@Injectable({providedIn: 'root'})
export class AuthService {

    // Behaviour subject allows to get data even after the event is not emitted, or 
    // it allows to get data which has been emitted previously i.e. get data on demand, even before emitting
    // while subject will get data whenever event is emitted after subscribe
    user = new BehaviorSubject<User>(null);
    tokenExpirationTimer: any;

    constructor(private http: HttpClient,
        private router: Router) {
    }

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_KEY, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe((tap(resData => {
            this.handleAuthentication(resData);
        })));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + API_KEY, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(tap(resData => {
            this.handleAuthentication(resData);
        }));
    }

    autoLogout(expirationDuration: number) {
        console.log('expirationDuration: ', expirationDuration);
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    autoLogin() {
        const userData: {
            email: string,
            userId: string,
            _token: string,
            _expirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }
        const loggedInUser = new User(userData.email, userData.userId, userData._token, new Date(userData._expirationDate));
        this.user.next(loggedInUser);
        const expirationDuration = new Date(userData._expirationDate).getTime() - new Date().getTime();
        this.autoLogout(expirationDuration);
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearInterval(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }
    
    private handleAuthentication(resData: AuthResponseData) {
        const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
        const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);
        this.user.next(user);
        this.autoLogout(+resData.expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }
}