import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UpperCaseFirstLetterPipe } from './pipes/upper-case-first-letter.pipe';
import { HttpClientModule } from '@angular/common/http';

import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HttpVariables } from './variables/http-url.variables';
import { ShortListNamePipe } from './pipes/short-list-name.pipe';


@NgModule({
  declarations: [
    NavbarComponent,
    NotFoundComponent,
    UpperCaseFirstLetterPipe,
    ShortListNamePipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    NotFoundComponent,
    UpperCaseFirstLetterPipe
  ],
  providers: [HttpVariables]
})
export class CoreModule { }