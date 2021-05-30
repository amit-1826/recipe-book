import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './modules/auth/auth.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ShoppingListComponent } from './modules/shopping-list/shopping-list.component';


const routes: Routes = [
  {
    path: '', redirectTo: '/recipes', pathMatch: 'full'
  },
  {
    path: 'shopping-list', component: ShoppingListComponent
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
