import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { RecipeService } from "src/app/services/recipe.service";
import { DataStorageService } from "src/app/shared/data-storage.service";
import { Recipe } from "./recipe.modal";

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {

    constructor(private dataStorageService: DataStorageService,
        private recipeService: RecipeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.recipeService.getRecipes().length) {
            return this.dataStorageService.fetchRecipes();
        }
        return this.recipeService.getRecipes();
    }
    
}