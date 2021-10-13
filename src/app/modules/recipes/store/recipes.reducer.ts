import { Recipe } from '../recipe.modal';
import * as RecipesActions from '../store/recipes.actions';

export interface State {
    recipes: Recipe[]
}

const initialState: State = {
    recipes: []
};

export function RecipesReducer(state = initialState, action: RecipesActions.RecipesActions) {
    switch (action.type) {
        case RecipesActions.SET_RECIPE:
            return {
                ...state,
                recipes: [...action.payload]
            };
        case RecipesActions.ADD_RECIPE:
            console.log('action.payload: ', action.payload);
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };
        case RecipesActions.UPDATE_RECIPE:
            const index = state.recipes.findIndex((recipe) => {
                return recipe.id == action.payload.id;
            });
            const recipeToUpdate = {...state.recipes[index], ...action.payload};
            const updateRecipes = [...state.recipes];
            updateRecipes[index] = recipeToUpdate;
            return {
                ...state,
                recipes: updateRecipes
            };
        case RecipesActions.DELETE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.filter((recipe) => {
                    return recipe.id !== action.payload;
                })
            };
        default:
            return state;
    }
}
