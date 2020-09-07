import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UpperCaseFirstLetterPipe } from './pipes/upper-case-first-letter.pipe';

import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';


@NgModule({
  declarations: [
    NavbarComponent,
    NotFoundComponent,
    UpperCaseFirstLetterPipe
  ],
  imports: [
      RouterModule
  ],
  exports: [
    NavbarComponent,
    NotFoundComponent,
    UpperCaseFirstLetterPipe
  ],
  providers: []
})
export class CoreModule { }