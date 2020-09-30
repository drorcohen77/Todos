import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortListName'
})
export class ShortListNamePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
