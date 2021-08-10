import { Action } from "@ngrx/store";

// square brackets is not necessary but is recommended as larger applications can have same identifiers
export const LOGIN = '[Auth] LOGIN';
export const LOGOUT = '[Auth] LOGOUT';
export const LOGIN_START = '[Auth] LOGIN_START';
export const LOGIN_FAIL = '[Auth] Login Fail';

export class Login implements Action {
    readonly type = LOGIN;
    constructor(public payload: {
        email: string,
        userId: string,
        token: string,
        expirationDate: Date
    }) { }
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class LoginStart implements Action {
    readonly type = LOGIN_START;
    constructor(public payload: {
        email: string,
        password: string
    }) { }
}

export class LoginFail implements Action {
    readonly type = LOGIN_FAIL;
    constructor(public payLoad: string) { }
}

export type AuthActions = Login | Logout | LoginFail | LoginStart;