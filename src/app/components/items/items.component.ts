import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { StateService } from 'src/app/core/services/state-srvices.service';
import { WordsValidators } from '../../core/MyValidators/words-validator'
import { TodoItem } from 'src/app/core/models/TodoItem.model';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  @Input() ListeID;
  @Input() ListItems$;

  public listItems: TodoItem[];
  public addItem: FormGroup;
  public activeItems: any;

  
  constructor(private stateService: StateService) { }

  ngOnInit(): void {
    
    if (this.ListItems$ !== undefined) {
      this.ListItems$.subscribe(items => this.listItems = items);
      this.buildAddItem();
    } else {
      this.stateService.getAllTodoItem().subscribe(todoItems => 
        this.listItems = todoItems.filter(activeItems => activeItems.isCompleted === false))
    }

  }


  buildAddItem() {
    this.addItem = new FormGroup ({
        newItem: new FormControl('', [
          Validators.minLength(2),
          Validators.maxLength(20),
          WordsValidators.minWords(1),
          WordsValidators.maxWords(5),
        ]
      )
    });
  }

  onTurnCompleted(itemId: number){

    this.stateService.MarkAsCompleted(itemId);
  }

  onSubmit() {
    
    if (this.listItems.length > 0) { 
      this.stateService.AddTodoItem(this.listItems[0].listId, this.addItem.value['newItem']);
    } else {
      this.stateService.AddTodoItem(this.ListeID, this.addItem.value['newItem']);
    }

    this.addItem.reset();
  }

}
