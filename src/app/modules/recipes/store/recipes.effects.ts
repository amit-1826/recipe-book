/* import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map } from "rxjs/operators";
import { Recipe } from "../recipe.modal";
import * as RecipeActions from '../store/recipes.actions';

@Injectable()
export class RecipesEffect {

    @Effect()
    setRecipes = this.actions$.pipe(
        ofType(RecipeActions.SET_RECIPE),
        map((recipes: Recipe[]) => {
            return recipes;
        })
    )

    constructor(private actions$: Actions) { }
} */