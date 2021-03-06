import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('manageIngredientsForm', {static: false}) manageIngredientsForm: NgForm;
  subscription: Subscription;
  isEditMode = false;
  editedIndex: number;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit() {
    this.subscription = this.shoppingListService.onIngredientEdit.subscribe((index) => {
      this.isEditMode = true;
      this.editedIndex = index;
      const editedIngredient = this.shoppingListService.getIngredient(index);
      this.manageIngredientsForm.setValue(editedIngredient);
    })
  }

  onSubmit() {
    const name = this.manageIngredientsForm.value.name;
    const amount = this.manageIngredientsForm.value.amount;
    if (name && amount) {
      if (this.isEditMode) {
        this.shoppingListService.updateIngredient(this.editedIndex, {name, amount});
      } else {
        this.shoppingListService.addIngredients({ name, amount }); 
      }
      this.onClear();
    }
  }

  onClear() {
    this.manageIngredientsForm.reset();
    this.isEditMode = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
