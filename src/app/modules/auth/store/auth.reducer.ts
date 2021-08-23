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
        case AuthActions.AUTHENTICATE_SUCCESS:
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
        case AuthActions.SIGN_UP_START:
            return {
                ...state,
                user: null,
                loading: true
            }
        case AuthActions.AUTHENTICATE_ERROR:
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