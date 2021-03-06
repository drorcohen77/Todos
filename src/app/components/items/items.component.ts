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

  private todoLists: TodoList[] = [];
  private tempItemList: any = [];

  public listItems: any = [];
  public addItem: FormGroup;
  public activeItems: any;
  public sortList: boolean = false;
  public sortedList: any;
  public todoListCaption: itemsToList;
  public ItemComponent: boolean;
  
  
  constructor(private stateService: StateService) { }

  async ngOnInit() {
    this.ItemComponent = this.stateService.isItemComponent;

    if (this.ListItems$ !== undefined) {
      this.ListItems$.subscribe(items => this.listItems = items);
      this.buildAddItem();
    } else {
      let activeListItems: TodoItem[] = [];

      this.stateService.todoitem.subscribe(todoItems => 
        this.listItems = todoItems.filter(activeItems => activeItems.isCompleted === false)
      );

      this.stateService.todolist.subscribe(todolists => {
        this.todoLists = todolists;

        todolists.map(listObj => {
          this.listItems.map(item => {
            listObj._id === item.listId? activeListItems.push( {...item, listCaption: listObj.caption, listColor: listObj.color} ) : item
          });
        })
      });
        
      this.listItems = activeListItems;

        console.log(this.listItems)
    };

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


  checkAll() {
    let completedList: TodoItem[];
    completedList = this.listItems.filter(item => !item.isCompleted);
    console.log(completedList)
    if (completedList.length > 0) {
      this.stateService.onCompletedItems(completedList, completedList[0].listId);
    }
  }


  onSortItems() {
    this.sortedList = [];
    !this.sortList? this.sortList = true : this.sortList = false;
    
    let tempList: TodoItem[] = [];

    this.listItems.map(item => {
      !item.isCompleted? tempList.push(item) : item
    });
    this.sortedList = tempList.concat( this.listItems.filter(item => item.isCompleted) );

  }


  onTurnCompleted(itemId: number){

    this.stateService.MarkAsCompleted(itemId);
  }

  onSubmit() {
    this.sortList = false;
    this.stateService.AddTodoItem(this.ListeID, this.addItem.value['newItem']);

    this.addItem.reset();
  }

}
