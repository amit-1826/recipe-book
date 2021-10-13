import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredients } from 'src/app/shared/ingredients.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../../store/appReducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('manageIngredientsForm', { static: false }) manageIngredientsForm: NgForm;
  subscription: Subscription;
  isEditMode = false;
  editedIndex: number;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe((editedItem) => {
      if (editedItem && editedItem.editIngredientIndex > -1) {
        this.isEditMode = true;
        this.editedIndex = editedItem.editIngredientIndex;
        this.manageIngredientsForm.setValue(editedItem.editedIngredient);
      } else {
        this.isEditMode = false;
      }
    })
    /* this.subscription = this.shoppingListService.onIngredientEdit.subscribe((index) => {
      this.isEditMode = true;
      this.editedIndex = index;
      const editedIngredient = this.shoppingListService.getIngredient(index);
      this.manageIngredientsForm.setValue(editedIngredient);
    }) */
  }

  onSubmit() {
    const name = this.manageIngredientsForm.value.name;
    const amount = this.manageIngredientsForm.value.amount;
    const newIngredient = new Ingredients(name, amount);
    if (name && amount) {
      if (this.isEditMode) {
        this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient))
        // this.shoppingListService.updateIngredient(this.editedIndex, { name, amount });
      } else {
        this.store.dispatch(new ShoppingListActions.AddIngradient({ name, amount }));
        // this.shoppingListService.addIngredients({ name, amount }); 
      }
      this.onClear();
    }
  }

  onClear() {
    this.manageIngredientsForm.reset();
    this.isEditMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit())
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit())
  }

}
