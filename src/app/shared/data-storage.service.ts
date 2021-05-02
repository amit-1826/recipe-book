import { HttpClient } from "@angular/common/http";
import {map, tap} from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { Recipe } from "../components/recipes/recipe.modal";
import { RecipeService } from "../services/recipe.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient,
        private recipeService: RecipeService) {
    }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://recipe-book-e299e-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(response => {
            console.log('r', recipes);
        })
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>('https://recipe-book-e299e-default-rtdb.firebaseio.com/recipes.json')
        .pipe(map(recipes => {
            return recipes.map(recipe => {
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
            });
        }), tap(recipes => {
            console.log('recipes:', recipes);
            this.recipeService.setRecipes(recipes);
        }));
    }
}