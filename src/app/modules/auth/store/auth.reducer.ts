import { User } from "../user.model";
import * as AuthActions from '../store/auth.actions';

export interface State {
    user: User
}

const initialState: State = {
    user: null
}

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
    return state;
    switch (action.type) {
        case AuthActions.LOGIN:

            break;
        case AuthActions.LOGOUT:


        default:
            return state;
    }
}