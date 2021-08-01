import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Recipe } from '../modules/recipes/recipe.modal';
import { Ingredients } from '../shared/ingredients.model';
import * as ShoppingListActions from '../modules/shopping-list/store/shopping-list.actions'
import * as fromApp from '../store/appReducer'

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject();
  private recipes: Recipe[] = [];

  constructor(private store: Store<fromApp.AppState>) { }

  getRecipes() {
    return this.recipes.slice();
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.getRecipes());
  }

  addRecipeToShoppingList(ingredients: Ingredients[]) {
    // this.shoppingListService.addRecipeIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  getRecipeById(id: number) {
    return this.recipes.find((recipe) => recipe.id == id);
  }

  addRecipe(recipe: any) {
    const newRecipe = new Recipe(Math.floor((Math.random() * 100) + 1),
      recipe.name, recipe.description, recipe.imagePath, recipe.ingredients)
    this.recipes.push(newRecipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(id: number, newRecipe: any) {
    const index = this.recipes.findIndex((recipe) => recipe.id == id);
    if (index != -1) {
      this.recipes[index].name = newRecipe.name;
      this.recipes[index].ingredients = newRecipe.ingredients;
      this.recipes[index].description = newRecipe.description;
      this.recipes[index].imagePath = newRecipe.imagePath;
      this.recipesChanged.next(this.recipes.slice());
    }
  }

  deleteRecipe(id: number) {
    const index = this.recipes.findIndex((recipe) => recipe.id == id);
    if (index != -1) {
      this.recipes.splice(index, 1);
      this.recipesChanged.next(this.recipes.slice());
    }
  }
}
