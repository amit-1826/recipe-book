import { HttpClient } from "@angular/common/http";
import { map, tap } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { Recipe } from "../modules/recipes/recipe.modal";
import { RecipeService } from "../services/recipe.service";
import { NotificationMsgService } from "./notification-message.service";
import { Store } from "@ngrx/store";
import * as fromApp from '../store/appReducer';
import * as RecipeActions from '../modules/recipes/store/recipes.actions';

@Injectable({ providedIn: 'root' })
export class DataStorageService {

    recipesUrl: string = 'https://recipe-book-e299e-default-rtdb.firebaseio.com/recipes.json';

    constructor(private http: HttpClient,
        private recipeService: RecipeService,
        private store: Store<fromApp.AppState>,
        private notificationsService: NotificationMsgService) {
    }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put(this.recipesUrl, recipes).subscribe(response => {
            this.notificationsService.showSuccessNotification('Saved');
        })
    }

    fetchRecipes() {

        // take operator get only single observable value ie. this will not subscribe everytime the user event is emitted,
        // tap operator is used to do some process with the response without modifying it

        // here exhaustMap subscribes to first observable ie. user, and then returns its value to other observable ie. http
        // here it will get user, and then return that value to http observable so that it can user user emitted value

        // exhaustMap is used here so that the return observable will be the http and not user

        return this.http.get<Recipe[]>(this.recipesUrl).pipe(
            map(recipes => {
                return recipes.map(recipe => {
                    return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
                });
            }),
            tap(recipes => {
                // this.recipeService.setRecipes(recipes);
                this.store.dispatch(new RecipeActions.SetRecipe(recipes));
            })
        );
    }
}