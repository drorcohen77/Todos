import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListsGuard } from './core/guard/lists.guard';

import { HomeComponent } from './components/home/home.component';
import { TodoListsComponent } from './components/todo-lists/todo-lists.component';
import { ItemsComponent } from './components/items/items.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EditListComponent } from './components/edit-list/edit-list.component';
import { ListDetailsComponent } from './components/list-details/list-details.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'lists', component: TodoListsComponent, canActivate: [ListsGuard] },
  { path: 'lists/:id', component: ListDetailsComponent },
  { path: 'lists/:id/edit', component: EditListComponent },
  { path: 'items', component: ItemsComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
