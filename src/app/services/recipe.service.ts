import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from '../components/recipes/recipe.modal';
import { Ingredients } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject();
  private recipes: Recipe[] = [
    new Recipe(1, 'Burger', 'Burger tasty recipe', 'http://lorempixel.com/400/200/food/', [new Ingredients('Potato', 4), new Ingredients('Tomato', 6)]),
    new Recipe(2, 'Pizza', 'Pizza very tasty recipe', 'http://lorempixel.com/400/200/food/', [new Ingredients('Aloo', 2), new Ingredients('Tamatar', 3)])
  ];

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  addRecipeToShoppingList(ingredients: Ingredients[]) {
    this.shoppingListService.addRecipeIngredients(ingredients);
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
