import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

import { TodoList } from '../models/TodoList.model';
import { StateService } from './state-srvices.service';


@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  private lists$: TodoList[];

  constructor(private stateService: StateService) { 

    this.stateService.getAllTodoList()
      .subscribe(allLists => this.lists$ = allLists);
  }


  async validateCaption(control: AbstractControl): Promise<null | ValidationErrors> {
    const val = control?.value;

    if (typeof(val) !== 'string') return null;

    const available = await this.lists$.some(list => list.caption === val);
    
    if (!available) return null;
    return {'captionAvailable': true}
  }
  
}
