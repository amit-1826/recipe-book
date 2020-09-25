import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RecipeDetailComponent } from './components/recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './components/recipes/recipe-edit/recipe-edit.component';
import { RecipeListComponent } from './components/recipes/recipe-list/recipe-list.component';
import { RecipeStartComponent } from './components/recipes/recipe-start/recipe-start.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';


const routes: Routes = [
  {
    path: '', redirectTo: '/recipes', pathMatch: 'full'
  },
  {
    path: 'shopping-list', component: ShoppingListComponent
  },
  {
    path: 'recipes', component: RecipesComponent, children: [
      {
        path: '', component: RecipeStartComponent
      },
      {
        path: 'new', component: RecipeEditComponent
      },
      {
        path: ':id', component: RecipeDetailComponent
      },
      {
        path: ':id/edit', component: RecipeEditComponent
      }
    ]
  },
  {
    path: 'not-found', component: NotFoundComponent
  },
  {
    path: '**', redirectTo: 'not-found', data: {mesage: 'Route not found'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }