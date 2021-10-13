import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredients } from 'src/app/shared/ingredients.model';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../../store/appReducer'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredients[] = [];
  ingredientSubscriber: Subscription;
  constructor(private store: Store<fromApp.AppState>) { }

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
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
    // this.shoppingListService.onIngredientEdit.next(index);
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
