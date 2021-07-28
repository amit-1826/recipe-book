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
        case ShoppingListActions.UPDATE_INGREDIENT:
            const oldIngredient = state.ingredients[action.payload.index];
            // below code means we are updating oldingredient key with new ingrdients key, this is required because if
            // we have id in old ingredient object, and id is not coming in new ingredient object then we should have id
            const updatedIngredient = {
                ...oldIngredient,
                ...action.payload.ingredient
            }
            const ingredients = [...state.ingredients];
            ingredients[action.payload.index] = updatedIngredient;

            state.ingredients[action.payload.index] = action.payload.ingredient;
            return {
                ...state,
                ingredients: ingredients
            }
        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((ig, index) => {
                    return index !== action.payload
                })
            }
        default:
            return state;
    }
}