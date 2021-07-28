import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredients } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredients[] = [];
  ingredientSubscriber: Subscription;
  constructor(private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingList: { ingredient: Ingredients[] } }>) { }

  ngOnInit() {
    this.ingredientSubscriber = this.store.select('shoppingList').subscribe((data: any) => {
      this.ingredients = data.ingredients;
    })
    /* this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientSubscriber = this.shoppingListService.ingredientAdded.subscribe((ingredients: Ingredients[]) => {
      this.ingredients = ingredients;
    }) */
  }

  onEditIngredient(index: number) {
    this.shoppingListService.onIngredientEdit.next(index);
  }

  onDeleteIngredient(index: number) {
    // this.shoppingListService.deleteIngredient(index);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient(index));
  }

  ngOnDestroy() {
    if (this.ingredientSubscriber) {
      this.ingredientSubscriber.unsubscribe();
    }
  }

}
