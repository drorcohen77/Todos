import { Injectable } from '@angular/core';
import { TodoList } from '../models/TodoList.model';
import { TodoItem } from '../models/TodoItem.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class StateService {

  private todoList:TodoList[] = [
    // {
    //   id: 1,
    //   caption: 'one',
    //   description: 'test1 t t t t t t t t t',
    //   image_url: 'event',
    //   color: 'black',
    // },
    // {
    //   id: 2,
    //   caption: 'two',
    //   description: 'test2 t t t t t t t t t',
    //   image_url: 'work',
    //   color: 'red',
    // }
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
    this.todolist$.next(this.todoList);
    console.log(this.todolist)
    return this.todolist;
  }

  getAllTodoItem():Observable<TodoItem[]> {
    this.todoitem$.next(this.todoItem);
    return this.todoitem;
  }

  getItemsFromList(listindex: number):Observable<TodoItem[]> {
    let listOfIndexItem:TodoItem[] = [];
    return this.getAllTodoItem()
      .pipe(
        map(itemlist => {
          itemlist.forEach(item => {
            if (+item.listId == listindex) {
              listOfIndexItem.push(item);
            }
          });
        return listOfIndexItem
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

  //Modifing Data:

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
    // let newtodolist:TodoList[] = [...this.todoList,newList];

    // let newtodolist:TodoList[];
    // await this.getAllTodoList().subscribe(
    //   (list => {
    //     newtodolist = [...list,newList];
    //   })
    // );
    
    
    // this.todoList.push(newList);
    this.todoList = [...this.todoList,newList];
    console.log(newList)
    this.todolist$.next(this.todoList);
    // console.log(newtodolist)
    // this.todolist$.next(newtodolist);
    return newList.id;
  }


  async ModifyList(list: TodoList): Promise<void> {
    console.log(list)
    let listindex = this.todoList.findIndex(todolist => todolist.id === list.id);
    let newtodolist:TodoList[] = Object.assign([...this.todoList],{ [listindex]:list });
    // let newtodolist:TodoList[];
    // await this.getAllTodoList().subscribe(
    //   (list => {
    //     newtodolist = Object.assign([...list],{ [listindex]:list });
    //   })
    // );
    //let newtodolist:TodoList[] = [...this.todoList.filter(List => List.id !== list.id),list];
    //this.todoList[listindex] = list;
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
    this.todoItem = [...this.todoItem,newItem];
    // this.todoItem.push(newItem);
    this.todoitem$.next(this.todoItem);

    return newItem.id;
  }


  MarkAsCompleted(itemId): Promise<void> {
    this.todoItem.find(item => item.id === itemId).isCompleted = true;
    this.todoitem$.next(this.todoItem);
    console.log(this.todoItem.find(item => item.id === itemId))
    return Promise.resolve();
  }


  async DeleteList(listId: number): Promise<void> {
    let listToBeDeleted = this.todoList.find(list => list.id === listId);
    let index = this.todoList.indexOf(listToBeDeleted);
    console.log(listToBeDeleted,index)
    // let newtodolist:TodoList[];
    // await this.getAllTodoList().subscribe(
    //   (list => {
    //     newtodolist = this.todoList.splice(index,1);
    //   })
    // );
    // newtodolist = this.todoList.splice(index,1);
    this.todoList.splice(index,1);
    console.log(this.todoList)
    console.log(this.todoItem)
    let newTodoItem = this.todoItem.filter(item => {
        return item.listId !== listId;
    });
    console.log(newTodoItem)
    // console.log(newtodolist)
    this.todolist$.next(this.todoList);
    // this.todolist$.next(newtodolist);
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


