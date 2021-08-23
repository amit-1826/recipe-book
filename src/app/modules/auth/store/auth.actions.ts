import { Action } from "@ngrx/store";

// square brackets is not necessary but is recommended as larger applications can have same identifiers
export const LOGIN = '[Auth] LOGIN';
export const LOGOUT = '[Auth] LOGOUT';
export const LOGIN_START = '[Auth] LOGIN_START';
export const LOGIN_FAIL = '[Auth] LOGIN_FAIL';
export const SIGN_UP_FAIL = '[Auth] SIGN_UP_FAIL';
export const SIGN_UP_START = '[Auth] SIGN_UP_START';
export const SIGN_UP_SUCCESS = '[Auth] SIGN_UP_SUCCESS';

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

export class SignUpStart implements Action {
    readonly type = SIGN_UP_START;
    constructor(public payload: {
        email: string,
        password: string
    }) { }
}

export class SignUpSuccess implements Action {
    readonly type = SIGN_UP_SUCCESS;
    constructor(public payload: {
        email: string,
        userId: string,
        token: string,
        expirationDate: Date
    }) { }
}

export class SignUpFail implements Action {
    readonly type = SIGN_UP_FAIL;
    constructor(public payLoad: string) { }
}

export type AuthActions = Login | Logout | LoginFail | LoginStart | SignUpStart | SignUpSuccess | SignUpFail;