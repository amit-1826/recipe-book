import { Action } from "@ngrx/store";

// square brackets is not necessary but is recommended as larger applications can have same identifiers
export const LOGIN = '[Auth] LOGIN';
export const LOGOUT = '[Auth] LOGOUT';

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

export type AuthActions = Login | Logout;