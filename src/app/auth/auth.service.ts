import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
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

    private user: Subject<User>;

    constructor(private http: HttpClient) {
    }

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_KEY, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe((tap(resData => {

        })));
    }

    login(email: string, password: string) {
        // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
        return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + API_KEY, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(tap(resData => {

        }));
    }
}