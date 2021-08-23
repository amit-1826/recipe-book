import { User } from "../user.model";
import * as AuthActions from '../store/auth.actions';

export interface State {
    user: User,
    authError: string,
    loading: boolean
}

const initialState: State = {
    user: null,
    authError: null,
    loading: false
}

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
    switch (action.type) {
        case AuthActions.LOGIN:
        case AuthActions.SIGN_UP_SUCCESS:
            const user = new User(action.payload.email, action.payload.userId, action.payload.token, action.payload.expirationDate)
            return {
                ...state,
                user: user,
                authError: null,
                loading: false
            }
        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null
            }
        case AuthActions.LOGIN_START:
            return {
                ...state,
                user: null,
                loading: true
            }
        case AuthActions.LOGIN_FAIL:
        case AuthActions.SIGN_UP_FAIL:
            console.log('sign up fail');
            return {
                ...state,
                user: null,
                authError: action.payLoad,
                loading: false
            }
        default:
            return state;
    }
}