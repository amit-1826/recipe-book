import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.modal';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  selectedRecipe: Recipe;
  subscriber: any;

  constructor(private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.subscriber = this.route.params.subscribe((params: Params) => {
      this.selectedRecipe = this.recipeService.getRecipeById(+params['id']);
      console.log('selected recipe in detail: ', this.selectedRecipe);
    })
  }

  addToShoppingList() {
    this.recipeService.addRecipeToShoppingList(this.selectedRecipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

}
