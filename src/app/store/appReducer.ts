import * as fromShopping from "../modules/shopping-list/store/shopping-list.reducer";
import * as fromAuth from '../modules/auth/store/auth.reducer'
import { ActionReducerMap } from "@ngrx/store";

export interface AppState {
    shoppingList: fromShopping.State,
    auth: fromAuth.State
}

export const appReducer: ActionReducerMap<AppState> = {
    shoppingList: fromShopping.ShoppingListReducer,
    auth: fromAuth.authReducer
}