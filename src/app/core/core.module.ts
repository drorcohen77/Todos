import { NgModule } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { UpperCaseFirstLetterPipe } from './pipes/upper-case-first-letter.pipe';



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