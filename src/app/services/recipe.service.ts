import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from '../components/recipes/recipe.modal';
import { Ingredients } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  selectedRecipe = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(1, 'Burger', 'Burger tasty recipe', 'https://cdn.pixabay.com/photo/2018/12/22/16/36/recipe-3889913_960_720.jpg', [new Ingredients('Potato', 4), new Ingredients('Tomato', 6)]),
    new Recipe(2, 'Pizza', 'Pizza very tasty recipe', 'https://cdn.pixabay.com/photo/2018/12/22/16/36/recipe-3889913_960_720.jpg', [new Ingredients('Aloo', 2), new Ingredients('Tamatar', 3)])
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
