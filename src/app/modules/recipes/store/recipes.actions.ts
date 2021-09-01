import { Action } from "@ngrx/store";
import { Recipe } from "../recipe.modal";

export const SET_RECIPE = '[Recipes] SET_RECIPE';
export const FETCH_RECIPES = '[Recipe] FETCH_RECIPES';

export class SetRecipe implements Action {
    readonly type = SET_RECIPE;
    constructor(public payload: Recipe[]) { }
}

export class FetchRecipes implements Action {
    readonly type = FETCH_RECIPES;
}

export type RecipesActions = SetRecipe | FetchRecipes;
