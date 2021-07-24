import { Action } from '@ngrx/store';

import { Ingredients } from "src/app/shared/ingredients.model";

const initialState = {
    ingredients: [
        new Ingredients('Apples', 10),
        new Ingredients('Tomatoes', 30)
    ]
}

export function ShoppingListReducer(state = initialState, action: Action) {

    switch (action.type) {
        case 'ADD_INGREDIENT':
            return {
                ...state,
                ingredients: [...state.ingredients, action]
            }
            break;

        default:
            break;
    }
}