import * as fromShopping from '../modules/shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../modules/auth/store/auth.reducer';
import * as fromRecipe from '../modules/recipes/store/recipes.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    shoppingList: fromShopping.State;
    auth: fromAuth.State;
    recipes: fromRecipe.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    shoppingList: fromShopping.ShoppingListReducer,
    auth: fromAuth.authReducer,
    recipes: fromRecipe.RecipesReducer
};
