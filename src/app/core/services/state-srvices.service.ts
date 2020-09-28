import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { TodoItem } from '../models/TodoItem.model';
import { TodoList } from '../models/TodoList.model';
import { HttpVariables } from '../variables/http-url.variables'


@Injectable({
  providedIn: 'root'
})
export class StateService {

  private todoLists:TodoList[] = [];
  private todoItems:TodoItem[] = [];
  
  private readonly todolist$ = new BehaviorSubject<TodoList[]>([]);
  readonly todolist = this.todolist$.asObservable();
  private readonly todoitem$ = new BehaviorSubject<TodoItem[]>([]);
  readonly todoitem = this.todoitem$.asObservable();

  public isItemComponent: boolean = false; // indecation for entering item component to show items from witch list


  constructor(private http: HttpClient, private httpUrl: HttpVariables) {}

  getAllTodoList():Observable<TodoList[]> {
    return this.http.get<TodoList[]>(this.httpUrl.fetchTodoLists)
      .pipe(
        tap(lists => {
          this.todoLists = lists;
          
          this.todolist$.next(this.todoLists);
        })
      );
  };


  getAllTodoItem():Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(this.httpUrl.fetchTodoItems)
      .pipe(
        tap(items => {
          this.todoItems = items;
          
          this.todoitem$.next(this.todoItems);
        })
      )
  };


  getItemsFromList(listindex: string):Observable<TodoItem[]> {
    let listOfIndexItem:TodoItem[] = [];

    return this.todoitem
      .pipe(
        map(itemlist => {
          listOfIndexItem = itemlist.filter(item => item.listId == listindex);
        return listOfIndexItem;
        })
      );
  };


  getTodoList(id: string):Observable<TodoList> {
    return this.todolist
      .pipe(
        map(list => {
          return list.find(item => item._id === id);
        })
      );
  }


  getTodoItem(id: string):Observable<TodoItem> {
    return this.todoitem
      .pipe(
        map(item => {
          return item.find(itemobj => itemobj._id === id);
        })
      );
  }



  async addList(caption: string, description: string, icon: string,color: string): Promise<string>{

    let newListID: string;
    
    return newListID = await this.http.post<TodoList>(
      this.httpUrl.createTodoList, 
      {
        caption: caption,
        description: description,
        image_url: icon,
        color: color
      }
    )
    .toPromise().then((list: TodoList) => {
      let newTodoList: TodoList[];
      this.todolist.subscribe(lists => newTodoList = [...lists, list]);
      this.todolist$.next(newTodoList);
      return list._id;
    });

  }


  async ModifyList(list: TodoList): Promise<void> {
    
    let listindex: number;

    await this.todolist
      .pipe(
        map(todolist => {
          return todolist.findIndex(todolist => todolist._id === list._id);
        })
      )
      .subscribe(listFound => listindex = listFound);
      
    await this.http.put<TodoList>(this.httpUrl.modifyTodoList + list._id, list)
      .pipe(tap(newlist => {
        let newtodolist:TodoList[] = Object.assign([...this.todoLists],{ [listindex]:newlist });
        this.todolist$.next(newtodolist);
      }))
      .toPromise();
  }


  async AddTodoItem(listId: string, caption: string): Promise<string> {
  
    let newItemID: string;

    return newItemID = await this.http.post<TodoItem>(
      this.httpUrl.createTodoItem,
      {
        caption: caption,
        listId: listId,
        isCompleted: false
      }
    )
    .toPromise()
    .then((item: TodoItem) => {
      let newItem: TodoItem[];
      this.todoitem.subscribe(items => newItem = [...items, item]);
      this.todoitem$.next(newItem);
      return item._id
    });
  }


  async MarkAsCompleted(itemId): Promise<void> { 
    let item: TodoItem;
    let Itemindex: number; 
    let updatedTodoItem: TodoItem[];

    await this.todoitem.subscribe(items => {
      item = items.find(Item => Item._id === itemId);
      Itemindex = items.findIndex(item => item._id === itemId);
    });
    
    item.isCompleted? item.isCompleted = false : item.isCompleted = true;
    let { isCompleted } = item; // destructing item: TodoItem object

    let itemsList:TodoItem[];
    await this.todoitem.subscribe(items => itemsList = items);

    await this.http.patch<TodoItem>(
        this.httpUrl.modifyTodoItem + item._id, 
        { isCompleted } 
      )
      .toPromise().then(updatedItem => {
        console.log(updatedItem)
        updatedTodoItem = Object.assign([...itemsList], { [Itemindex]:updatedItem });
        this.todoitem$.next(updatedTodoItem);
      });

  }


  async onCompletedItems(uncompItems: TodoItem[], listId: string):Promise<void> {

    let itemList: TodoItem[];
    this.todoitem.subscribe(list => itemList = list);

    await this.http.patch<TodoItem[]>(this.httpUrl.checkAllItems + listId, uncompItems).subscribe(() => {
 
      itemList.map(itemInList => {
        if (!itemInList.isCompleted) {
          itemInList.isCompleted = true;
        }
      });

        console.log(itemList)
      this.todoitem$.next(itemList);
    });

    return Promise.resolve();

  }


  async DeleteList(listId: string): Promise<void> {

    await this.http.delete<TodoList>(this.httpUrl.deleteTodoList + listId)
    .subscribe(() => {
        let newTodoList: TodoList[];
        this.todolist.subscribe(list => newTodoList = list.filter(newlist => newlist._id !== listId));
        this.todolist$.next(newTodoList);

        let newTodoItem: TodoItem[]; 
        this.todoitem.subscribe(items => newTodoItem = items.filter(item => item.listId !== listId));
        this.todoitem$.next(newTodoItem);
    });

    return Promise.resolve();
  };

  
}


