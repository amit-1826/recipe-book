import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { RecipeService } from "src/app/services/recipe.service";
import { Recipe } from "./recipe.modal";
import * as fromApp from '../../../app/store/appReducer';
import { Store } from "@ngrx/store";
import * as RecipesActions from './store/recipes.actions';
import { Actions, ofType } from "@ngrx/effects";
import { map, take } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {

    constructor(private store: Store<fromApp.AppState>,
        private actions$: Actions,
        private recipeService: RecipeService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.store.dispatch(new RecipesActions.FetchRecipes());
        return this.actions$.pipe(
            ofType(RecipesActions.SET_RECIPE),
            take(1))
    }

}