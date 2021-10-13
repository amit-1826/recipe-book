import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.modal';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/appReducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[] = [];
  recipeSubscription: Subscription;

  constructor(private recipeService: RecipeService,
    private router: Router,
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipeSubscription = this.store
      .select('recipes')
      .pipe((map(recipeState => { return recipeState.recipes })))
      .subscribe((recipes: Recipe[]) => {
        console.log('recipes: ', recipes);
        this.recipes = recipes;
      })
    // this.recipes = this.recipeService.getRecipes();
  }

  onAddNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
  }

}
