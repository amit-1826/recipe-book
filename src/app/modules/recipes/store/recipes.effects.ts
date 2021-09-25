import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs/operators";
import { Recipe } from "../recipe.modal";
import * as RecipeActions from '../store/recipes.actions';

@Injectable()
export class RecipesEffect {
    recipesUrl: string = 'https://recipe-book-e299e-default-rtdb.firebaseio.com/recipes.json';

    @Effect()
    fetchRecipes = this.actions$.pipe(
        ofType(RecipeActions.FETCH_RECIPES),
        switchMap(() => {
            return this.http.get<Recipe[]>(this.recipesUrl)
        }),
        map((recipes: Recipe[]) => {
            return recipes.map(recipe => {
                return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
            });
        }),
        map((recipes) => {
            return new RecipeActions.SetRecipe(recipes);
        })
    )

    constructor(private actions$: Actions, private http: HttpClient) { }
}