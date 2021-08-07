import { Action, UPDATE } from '@ngrx/store'
import { Ingredients } from 'src/app/shared/ingredients.model';

// square brackets is not necessary but is recommended as larger applications can have same identifiers
export const ADD_INGREDIENT = '[Shopping List] ADD_INGREDIENT';
export const ADD_INGREDIENTS = '[Shopping List] ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = '[Shopping List] UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = '[Shopping List] DELETE_INGREDIENT';
export const START_EDIT = '[Shopping List] START_EDIT';
export const STOP_EDIT = '[Shopping List] STOP_EDIT';

export class AddIngradient implements Action {
    readonly type = ADD_INGREDIENT;
    constructor(public payload: Ingredients) { }
}

export class AddIngredients implements Action {
    readonly type = ADD_INGREDIENTS;
    constructor(public payload: Ingredients[]) { }
}

export class UpdateIngredient implements Action {
    readonly type = UPDATE_INGREDIENT;
    constructor(public payload: Ingredients) { }
}

export class DeleteIngredient implements Action {
    readonly type = DELETE_INGREDIENT;
    constructor(public payload: number) { }
}

export class StartEdit implements Action {
    readonly type = START_EDIT;
    constructor(public payload: number) { }
}

export class StopEdit implements Action {
    readonly type = STOP_EDIT;
}

export type ShoppingListAction = AddIngradient | AddIngredients | UpdateIngredient | DeleteIngredient | StartEdit | StopEdit;
