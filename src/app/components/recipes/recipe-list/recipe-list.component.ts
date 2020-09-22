import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.modal';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
  }

  onRecipeSelected(recipe) {
    console.log('recipe selected: ', recipe);
  }

  onAddNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
