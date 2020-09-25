import { Injectable } from '@angular/core';
import { Recipe } from '../components/recipes/recipe.modal';
import { Ingredients } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
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
}
