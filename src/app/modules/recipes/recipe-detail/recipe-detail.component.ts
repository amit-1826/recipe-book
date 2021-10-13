import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.modal';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/appReducer';
import * as RecipeAction from '../store/recipes.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  selectedRecipe: Recipe;
  subscriber: any;
  recipeId: number;

  constructor(private route: ActivatedRoute,
              private store: Store<fromApp.AppState>,
              private router: Router) { }

  ngOnInit() {
    this.subscriber = this.route.params.pipe(map((params) => {
      return +params.id;
    }), switchMap((id) => {
      this.recipeId = id;
      return this.store.select('recipes');
    }), map((recipeState) => {
      return recipeState.recipes.find((recipe) => recipe.id == this.recipeId);
    })).subscribe((recipe) => {
      this.selectedRecipe = recipe;
    });
    /* this.subscriber = this.route.params.subscribe((params: Params) => {
      this.recipeId = +params['id'];
      this.selectedRecipe = this.recipeService.getRecipeById(this.recipeId);
    }) */
  }

  addToShoppingList() {
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.selectedRecipe.ingredients));
    // this.recipeService.addRecipeToShoppingList(this.selectedRecipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    // this.recipeService.deleteRecipe(this.recipeId);
    this.store.dispatch(new RecipeAction.DeleteRecipe(this.recipeId));
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

}
