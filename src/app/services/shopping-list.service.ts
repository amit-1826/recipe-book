import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredients } from '../shared/ingredients.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientAdded = new Subject<Ingredients[]>();
  onIngredientEdit = new Subject<number>();

  ingredients: Ingredients[] = [
    new Ingredients('Apples', 10),
    new Ingredients('Tomatoes', 30)
  ];
  constructor() { }

  addIngredients(ingredient: Ingredients) {
    this.ingredients.push(ingredient);
    this.ingredientAdded.next(this.ingredients.slice());
  }

  getIngredient(index: number): Ingredients {
    return this.ingredients[index];
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientAdded.next(this.ingredients.slice());
  }

  updateIngredient(index: number, data: Ingredients) {
    this.ingredients[index] = data;
    this.ingredientAdded.next(this.ingredients.slice());
  }

  addRecipeIngredients(ingredients: any) {
    this.ingredients.push(...ingredients);
    this.ingredientAdded.next(this.ingredients.slice());
  }
}
