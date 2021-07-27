import { Action } from '@ngrx/store'
import { Ingredients } from 'src/app/shared/ingredients.model';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';

export class AddIngradient implements Action {
    readonly type = ADD_INGREDIENT;
    constructor(public payload: Ingredients) { }
}

export class AddIngredients implements Action {
    readonly type = ADD_INGREDIENTS;
    constructor(public payload: Ingredients[]) { }
}

export type ShoppingListAction = AddIngradient | AddIngredients;
