import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UpperCaseFirstLetterPipe } from './pipes/upper-case-first-letter.pipe';

import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HttpVariables } from './variables/http-url.variables';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    NavbarComponent,
    NotFoundComponent,
    UpperCaseFirstLetterPipe
  ],
  imports: [
      RouterModule,
      HttpClientModule
  ],
  exports: [
    NavbarComponent,
    NotFoundComponent,
    UpperCaseFirstLetterPipe
  ],
  providers: [HttpVariables]
})
export class CoreModule { }