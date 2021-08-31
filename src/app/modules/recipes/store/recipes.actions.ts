import { Action } from "@ngrx/store";
import { Recipe } from "../recipe.modal";

export const SET_RECIPE = '[Recipes] SET_RECIPE';

export class SetRecipe implements Action {
    readonly type = SET_RECIPE;
    constructor(public payload: Recipe[]) { }
}

export type RecipesActions = SetRecipe;
