import { Action } from "@ngrx/store";
import { Recipe } from "../recipe.modal";

export const SET_RECIPE = '[Recipes] SET_RECIPE';
export const FETCH_RECIPES = '[Recipe] FETCH_RECIPES';
export const ADD_RECIPE = '[Recipe] ADD_RECIPE';
export const UPDATE_RECIPE = '[Recipe] UPDATE_RECIPE';
export const DELETE_RECIPE = '[Recipe] DELETE_RECIPE';

export class SetRecipe implements Action {
    readonly type = SET_RECIPE;
    constructor(public payload: Recipe[]) { }
}

export class FetchRecipes implements Action {
    readonly type = FETCH_RECIPES;
}

export class AddRecipe implements Action {
    readonly type = ADD_RECIPE;
    constructor(public payload: Recipe) {
    }
}

export class UpdateRecipe implements Action {
    readonly type = UPDATE_RECIPE;
    constructor(public payload: Recipe) {
    }
}

export class DeleteRecipe implements Action {
    readonly type = DELETE_RECIPE;
    constructor(public payload: number) {
    }
}

export type RecipesActions = SetRecipe | FetchRecipes | UpdateRecipe | AddRecipe | DeleteRecipe;
