import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/appReducer';
import { map } from 'rxjs/operators';
import * as RecipeActions from '../store/recipes.actions';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  recipeForm: FormGroup;

  id: number;
  editMode = false;
  subscriber: any;
  storeSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private store: Store<fromApp.AppState>,
              private router: Router) { }

  ngOnInit() {
    this.subscriber = this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params.id;
          this.editMode = params.id != null;
          this.initForm();
        });
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }

  private initForm() {
    let recipeName = '';
    let imagePath = '';
    let description = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      this.storeSubscription = this.store.select('recipes').pipe(map((recipeState) => {
        return recipeState.recipes.find((recipe) => recipe.id == this.id);
      })).subscribe(recipe => {
        recipeName = recipe.name;
        imagePath = recipe.imagePath;
        description = recipe.description;
        if (recipe.ingredients) {
          for (const ingredient of recipe.ingredients) {
            recipeIngredients.push(new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            }));
          }
        }
      });
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(imagePath, Validators.required),
      description: new FormControl(description, Validators.required),
      ingredients: recipeIngredients
    });
  }

  get controls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onRemoveIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
    const recipe: any = {
      name: this.recipeForm.value.name,
      description: this.recipeForm.value.description,
      imagePath: this.recipeForm.value.imagePath,
      ingredients: this.recipeForm.value.ingredients
    };
    if (!this.editMode) {
      recipe.id = Math.floor((Math.random() * 100) + 1);
      this.store.dispatch(new RecipeActions.AddRecipe(recipe));
    } else {
      recipe.id = this.id;
      this.store.dispatch(new RecipeActions.UpdateRecipe(recipe));
    }
    this.onCancel();
  }

}
