import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthComponent } from './auth/auth.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RecipeDetailComponent } from './components/recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './components/recipes/recipe-edit/recipe-edit.component';
import { RecipeListComponent } from './components/recipes/recipe-list/recipe-list.component';
import { RecipeStartComponent } from './components/recipes/recipe-start/recipe-start.component';
import { RecipesResolverService } from './components/recipes/recipes-resolver.service';
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
    path: 'recipes', canActivate: [AuthGuardService], component: RecipesComponent, children: [
      {
        path: '', component: RecipeStartComponent
      },
      {
        path: 'new', component: RecipeEditComponent
      },
      {
        path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]
      },
      {
        path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]
      }
    ]
  },
  {
    path: 'not-found', component: NotFoundComponent
  },
  {
    path: 'auth', component: AuthComponent
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
