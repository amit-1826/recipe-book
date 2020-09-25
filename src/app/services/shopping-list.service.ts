import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredients } from '../shared/ingredients.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientAdded = new Subject<Ingredients[]>();

  ingredients: Ingredients[] = [
    new Ingredients('Apples', 10),
    new Ingredients('Tomatoes', 30)
  ];
  constructor() { }

  addIngredients(ingredient: Ingredients) {
    this.ingredients.push(ingredient);
    this.ingredientAdded.next(this.ingredients.slice());
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  deleteIngredient() {

  }

  addRecipeIngredients(ingredients: any) {
    console.log('ingredients', ingredients);
    this.ingredients.push(...ingredients);
    this.ingredientAdded.next(this.ingredients.slice());
  }
}
