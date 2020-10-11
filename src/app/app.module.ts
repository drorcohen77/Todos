import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TodoListsComponent } from './components/todo-lists/todo-lists.component';
import { ItemsComponent } from './components/items/items.component';
import { EditListComponent } from './components/edit-list/edit-list.component';
import { ListDetailsComponent } from './components/list-details/list-details.component';
import { AccountModule } from './account/account.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TodoListsComponent,
    ItemsComponent,
    EditListComponent,
    ListDetailsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    CoreModule,
    AccountModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatIconModule,
    MatSelectModule,
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
