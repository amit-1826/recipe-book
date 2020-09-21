import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.modal';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  selectedRecipe: Recipe;
  constructor(private recipeService: RecipeService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.selectedRecipe = this.recipeService.getRecipeById(+params['id']);
      console.log('selected recipe in detail: ', this.selectedRecipe);
    })
  }

  addToShoppingList() {
    this.recipeService.addRecipeToShoppingList(this.selectedRecipe.ingredients);
  }

}
