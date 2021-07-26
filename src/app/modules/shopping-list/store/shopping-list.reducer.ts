import { Ingredients } from "src/app/shared/ingredients.model";
import * as ShoppingListAction from './shopping-list.actions';

const initialState = {
    ingredients: [
        new Ingredients('Apples', 10),
        new Ingredients('Tomatoes', 30)
    ]
}

export function ShoppingListReducer(state = initialState, action: ShoppingListAction.AddIngradient) {

    switch (action.type) {
        case ShoppingListAction.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            }
            break;

        default:
            return state;
            break;
    }
}