import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredients } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredients[] = [];
  ingredientSubscriber: Subscription;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientSubscriber = this.shoppingListService.ingredientAdded.subscribe((ingredients: Ingredients[]) => {
      this.ingredients = ingredients;
    })
  }

  onAddingIngredient(ingredients: Ingredients[]) {
    this.ingredients.push(...ingredients);
  }

  onEditIngredient(index: number) {
    this.shoppingListService.onIngredientEdit.next(index);
  }

  ngOnDestroy() {
    this.ingredientSubscriber.unsubscribe();
  }

}
