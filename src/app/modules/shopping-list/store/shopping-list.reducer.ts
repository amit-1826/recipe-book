import { Ingredients } from "src/app/shared/ingredients.model";
import * as ShoppingListActions from './shopping-list.actions';

export interface AppState {
    shoppingList: State
}

export interface State {
    ingredients: Ingredients[],
    editedIngredient: Ingredients,
    editIngredientIndex: number
}

const initialState: State = {
    ingredients: [
        new Ingredients('Apples', 10),
        new Ingredients('Tomatoes', 30)
    ],
    editedIngredient: null,
    editIngredientIndex: -1
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
            const oldIngredient = state.ingredients[state.editIngredientIndex];
            // below code means we are updating oldingredient key with new ingrdients key, this is required because if
            // we have id in old ingredient object, and id is not coming in new ingredient object then we should have id
            const updatedIngredient = {
                ...oldIngredient,
                ...action.payload
            }
            const ingredients = [...state.ingredients];
            ingredients[state.editIngredientIndex] = updatedIngredient;

            state.ingredients[state.editIngredientIndex] = action.payload;
            return {
                ...state,
                ingredients: ingredients,
                editIngredientIndex: -1,
                editedIngredient: null
            }
        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((ig, index) => {
                    return index !== action.payload
                })
            }
        case ShoppingListActions.START_EDIT:
            return {
                ...state,
                editedIngredient: { ...state.ingredients[action.payload] },
                editIngredientIndex: action.payload
            }
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editIngredientIndex: -1
            }
        default:
            return state;
    }
}