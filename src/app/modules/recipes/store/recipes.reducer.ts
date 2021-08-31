import { Recipe } from '../recipe.modal';
import * as RecipesActions from '../store/recipes.actions';

export interface State {
    recipes: Recipe[]
}

const initialState: State = {
    recipes: []
}

export function RecipesReducer(state = initialState, action: RecipesActions.RecipesActions) {
    switch (action.type) {
        case RecipesActions.SET_RECIPE:
            return {
                ...state,
                recipes: [...action.payload]
            }
        default:
            return state;
    }
}