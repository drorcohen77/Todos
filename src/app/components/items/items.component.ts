import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { StateService } from 'src/app/core/services/state-srvices.service';
import { WordsValidators } from '../../core/MyValidators/words-validator'
import { TodoItem } from 'src/app/core/models/TodoItem.model';
import { TodoList } from 'src/app/core/models/TodoList.model';


interface itemsToList {
  listId: string;
  listCaption: string;
};


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  @Input() ListeID;
  @Input() ListItems$;

  public listItems: TodoItem[] =[];
  public addItem: FormGroup;
  public activeItems: any;
  public sortList: boolean = false;
  public sortedList: TodoItem[];
  public todoListCaption: itemsToList;
  public ItemComponent: boolean;
  
  constructor(private stateService: StateService) { }

  async ngOnInit() {
    this.ItemComponent = this.stateService.isItemComponent;

    if (this.ListItems$ !== undefined) {
      this.ListItems$.subscribe(items => this.listItems = items);
      this.buildAddItem();
    } else {
      this.stateService.todoitem.subscribe(todoItems => 
        this.listItems = todoItems.filter(activeItems => activeItems.isCompleted === false));
        
    };
    this.stateService.todolist.subscribe(todolists => 
      console.log(todolists)
    );
    // this.listItems
    // this.todoListCaption. 

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


  onSortItems() {
    this.sortedList = [];
    !this.sortList? this.sortList = true : this.sortList = false;
    
    this.stateService.todolist.subscribe(list => {
      let tempList: TodoItem[];
      
      list.map(item => {
        tempList = this.listItems.filter(listItem => listItem.listId === item._id);
        this.sortedList = this.sortedList.concat(tempList);
        // sortedList = [...sortedList,...tempList];
        console.log(this.sortedList)
      })
    });

  }


  onTurnCompleted(itemId: number){

    this.stateService.MarkAsCompleted(itemId);
  }

  onSubmit() {
    
    // if (this.listItems.length > 0) { 
    //   this.stateService.AddTodoItem(this.listItems[0].listId, this.addItem.value['newItem']);
    // } else {
      this.stateService.AddTodoItem(this.ListeID, this.addItem.value['newItem']);
    // }

    this.addItem.reset();
  }

}
