import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upperCaseFirstLetter'
})
export class UpperCaseFirstLetterPipe implements PipeTransform {

  transform(value: any): string {
    let newWord = '';

    if(typeof(value) === 'string') {
      newWord = value.charAt(0).toUpperCase() + value.slice(1);
      return newWord;
    }
    
    return '';
  }

}
