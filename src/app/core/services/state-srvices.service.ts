import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TodoItem } from '../models/TodoItem.model';
import { TodoList } from '../models/TodoList.model';


@Injectable({
  providedIn: 'root'
})
export class StateService {

  private todoList:TodoList[] = [
    {
      id: 1,
      caption: 'one',
      description: 'test1 t t t t t t t t t',
      image_url: 'event',
      color: 'black',
    },
    {
      id: 2,
      caption: 'two',
      description: 'test2 t t t t t t t t t',
      image_url: 'work',
      color: 'red',
    }
  ];
  private todoItem:TodoItem[] = [
    {
      id: 1,
      caption: 'one',
      listId: 1,
      isCompleted: false
    },
    {
      id: 2,
      caption: 'two',
      listId: 1,
      isCompleted: true
    },
    {
      id: 3,
      caption: 'tree',
      listId: 1,
      isCompleted: true
    },
    {
      id: 4,
      caption: 'two',
      listId: 2,
      isCompleted: true
    }
  ];
  
  private readonly todolist$ = new BehaviorSubject<TodoList[]>(this.todoList);
  readonly todolist = this.todolist$.asObservable();
  private readonly todoitem$ = new BehaviorSubject<TodoItem[]>(this.todoItem);
  readonly todoitem = this.todoitem$.asObservable();


  constructor() {}

  getAllTodoList():Observable<TodoList[]> {
    
    return this.todolist;
  }

  getAllTodoItem():Observable<TodoItem[]> {
    
    return this.todoitem;
  }

  getItemsFromList(listindex: number):Observable<TodoItem[]> {
    let listOfIndexItem:TodoItem[] = [];
    return this.getAllTodoItem()
      .pipe(
        map(itemlist => {
          listOfIndexItem = itemlist.filter(item => item.listId == listindex);
        return listOfIndexItem;
        })
      );

  }

  getTodoList(id: number):Observable<TodoList> {
    return this.getAllTodoList()
      .pipe(
        map(list => {
          return list.find(item => item.id === id);
        })
      );
  }

  getTodoItem(id: number):Observable<TodoItem> {
    return this.getAllTodoItem()
      .pipe(
        map(item => {
          return item.find(itemobj => itemobj.id === id);
        })
      );
  }



  async addList(caption: string, description: string, icon: string,color: string): Promise<number>{
    let newID:number = Math.ceil(Math.random()*100);
    let todoType = 'lists';
    
    this.createID(newID,todoType);
    
    let newList:TodoList = {
      id: newID,
      caption: caption,
      description: description,
      image_url: icon,
      color: color
    };
  
    let newTodoList = [...this.todoList, newList];
    
    this.todolist$.next(newTodoList);

    return newList.id;
  }


  async ModifyList(list: TodoList): Promise<void> {
    
    let listindex: number;

    this.getAllTodoList()
      .pipe(
        map(todolist => {
          return todolist.findIndex(todolist => todolist.id === list.id);
        })
      )
      .subscribe(listFound => listindex = listFound);

    let newtodolist:TodoList[] = Object.assign([...this.todoList],{ [listindex]:list });

    this.todolist$.next(newtodolist);

    return Promise.resolve();
  }


  async AddTodoItem(listId: number, caption: string): Promise<number> {
    let newID:number = Math.ceil(Math.random()*100);
    let todoType = 'items';

    this.createID(newID,todoType);

    let newItem: TodoItem = {
      id: newID,
      caption: caption,
      listId: listId,
      isCompleted: false
    }
    let newTodoItem = [...this.todoItem,newItem];

    this.todoitem$.next(newTodoItem);

    return newItem.id;
  }


  MarkAsCompleted(itemId): Promise<void> {
    let item: TodoItem;
    this.getAllTodoItem().pipe(
      map(items => {
        return items.find(Item => Item.id === itemId)
      })
    )
    .subscribe(todoitem => item = todoitem);
    
    item.isCompleted? item.isCompleted = false : item.isCompleted = true;

    let newTodoItem = [...this.todoItem, item];
    this.todoitem$.next(newTodoItem);
    
    return Promise.resolve();
  }


  async DeleteList(listId: number): Promise<void> {
    let listToBeDeleted = this.todoList.find(list => list.id === listId);
    let index = this.todoList.indexOf(listToBeDeleted);

    let newTodoList = this.todoList.splice(index,1);

    let newTodoItem = this.todoItem.filter(item => {
        return item.listId !== listId;
    });

    this.todolist$.next(newTodoList);
    
    this.todoitem$.next(newTodoItem);
    return Promise.resolve();
  }


  private createID(newID: number, todoType: string) {
    let listID: any;

    if (todoType === 'lists') {
      listID = this.todoList.find(Id => Id.id === newID);
    } else {
      listID = this.todoItem.find(Id => Id.id === newID);
    }

    if (listID == undefined) {
      return newID;
      
    } else if (listID.id == newID) {
      newID = Math.ceil(Math.random()*100);
      this.createID(newID,todoType);
    }
    
  }
  
}


