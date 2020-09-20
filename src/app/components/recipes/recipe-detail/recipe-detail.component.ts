import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.modal';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() selectedRecipe: Recipe;
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    console.log('selkected recuoe: ', this.selectedRecipe);
  }

  addToShoppingList() {
    this.recipeService.addRecipeToShoppingList(this.selectedRecipe.ingredients);
  }

}
