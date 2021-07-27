import { Ingredients } from "src/app/shared/ingredients.model";
import * as ShoppingListActions from './shopping-list.actions';

const initialState = {
    ingredients: [
        new Ingredients('Apples', 10),
        new Ingredients('Tomatoes', 30)
    ]
}

export function ShoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListAction) {

    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            }
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            }
        default:
            return state;
    }
}