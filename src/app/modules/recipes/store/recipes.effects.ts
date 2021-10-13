import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import { Recipe } from "../recipe.modal";
import * as RecipeActions from '../store/recipes.actions';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../store/appReducer';

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
    );

    @Effect({dispatch: false})
    storeRecipes = this.actions$.pipe(
        ofType(RecipeActions.STORE_RECIPE),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([actionData, recipeState]) => {
            return this.http.put(this.recipesUrl, recipeState.recipes);
        })
    );

    constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) { }
}
