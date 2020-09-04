import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UpperCaseFirstLetterPipe } from './pipes/upper-case-first-letter.pipe';

import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [
    NavbarComponent,
    UpperCaseFirstLetterPipe
  ],
  imports: [
      RouterModule
  ],
  exports: [
    NavbarComponent,
    UpperCaseFirstLetterPipe
  ],
  providers: []
})
export class CoreModule { }