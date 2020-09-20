import { EventEmitter, Injectable } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientAdded = new EventEmitter<Ingredients[]>();

  ingredients: Ingredients[] = [
    new Ingredients('Apples', 10),
    new Ingredients('Tomatoes', 30)
  ];
  constructor() { }

  addIngredients(ingredient: Ingredients) {
    this.ingredients.push(ingredient);
    this.ingredientAdded.emit(this.ingredients.slice());
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  deleteIngredient() {

  }

  addRecipeIngredients(ingredients) {
    console.log('ingredients', ingredients);
    this.ingredients.push(...ingredients);
    this.ingredientAdded.emit(this.ingredients.slice());
  }
}
