import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { TodoItem } from '../models/TodoItem.model';
import { TodoList } from '../models/TodoList.model';
import { HttpVariables } from '../variables/http-url.variables'
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';


@Injectable({
  providedIn: 'root'
})
export class StateService {

  private todoLists:TodoList[];
  private todoItems:TodoItem[];
  
  private readonly todolist$ = new BehaviorSubject<TodoList[]>([]);
  readonly todolist = this.todolist$.asObservable();
  private readonly todoitem$ = new BehaviorSubject<TodoItem[]>([]);
  readonly todoitem = this.todoitem$.asObservable();


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

    // return this.getAllTodoItem()
    //   .pipe(
    //     map(itemlist => {
    //       listOfIndexItem = itemlist.filter(item => item.listId == listindex);
    //     return listOfIndexItem;
    //     })
    //   );
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
    

    return newListID = await this.http.post(
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

    
    
    
    // return newListID;

    // .subscribe((list: TodoList) => {
    //   newListID = list._id;
    // })
    
    
    // .toPromise()
    // .then(newList => console.log(newList))
    // .pipe(
    //   tap((list: TodoList) => console.log(list._id))
    // );

    // return newListID
    // let newID:string = Math.ceil(Math.random()*100).toString();
    // let todoType = 'lists';
    
    // this.createID(newID,todoType);
    // let newList:TodoList = {
    //   _id: newID,
    //   caption: caption,
    //   description: description,
    //   image_url: icon,
    //   color: color
    // };
  
    // let newTodoList = [...this.todoList, newList];
    
    // this.todolist$.next(newTodoList);

    // return newList._id;
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

    await this.http.put(this.httpUrl.modifyTodoList + list._id, list)
      .subscribe(newlist => {
        let newtodolist:TodoList[] = Object.assign([...this.todoLists],{ [listindex]:newlist });
        this.todolist$.next(newtodolist);
      });
    // let newtodolist:TodoList[] = Object.assign([...this.todoLists],{ [listindex]:list });

    // this.todolist$.next(newtodolist);

    return Promise.resolve();
  }


  async AddTodoItem(listId: string, caption: string): Promise<string> {
    // let newID:string = Math.ceil(Math.random()*100).toString();
    // let todoType = 'items';

    // this.createID(newID,todoType);
    let newItemID: string;

    return newItemID = await this.http.post(
      this.httpUrl.createTodoItem,
      {
        // _id: '',
        caption: caption,
        listId: listId,
        isCompleted: false
      }
    )
    .toPromise().then((item: TodoItem) => {
      let newItem: TodoItem[];
      this.todoitem.subscribe(items => newItem = [...items, item]);
      this.todoitem$.next(newItem);
      return item._id
    });
     
    // let newTodoItem = [...this.todoItems,newItem];

    // this.todoitem$.next(newTodoItem);

    // return newItem._id;
  }


  async MarkAsCompleted(itemId): Promise<void> { 
    let item: TodoItem; 

    await this.todoitem.pipe(
      map(items => {
        return items.find(Item => Item._id === itemId);
      })
    )
    .subscribe(todoitem => item = todoitem);
    
    item.isCompleted? item.isCompleted = false : item.isCompleted = true;
    let { isCompleted } = item; // destructing item: TodoItem object

    await this.http.put(
        this.httpUrl.modifyTodoItem + item._id, 
        { isCompleted } 
      )
      .subscribe((newItem) => {
        let newTodoItem: TodoItem[] = Object.assign([...this.todoItems], { newItem });
      // let newTodoItem: TodoItem[] = this.todoItems.map(items => items === item ? newItem : items);
        this.todoitem$.next(newTodoItem);
    });
    
    // let newTodoItem = [...this.todoItems, item];
    // this.todoitem$.next(newTodoItem);
    
    return Promise.resolve();
  }


  async DeleteList(listId: string): Promise<void> {
console.log(this.httpUrl.deleteTodoList + listId)

    await this.http.delete(this.httpUrl.deleteTodoList + listId)
      .subscribe(() => {
        let newTodoList: TodoList[];
        this.todolist.subscribe(list => newTodoList = list.filter(newlist => newlist._id !== listId));
        this.todolist$.next(newTodoList);

        let newTodoItem: TodoItem[]; 
        this.todoitem.subscribe(items => newTodoItem = items.filter(item => item.listId !== listId));
        this.todoitem$.next(newTodoItem);
    });
    // let listToBeDeleted = this.todoLists.find(list => list._id === listId);
    // let index = this.todoLists.indexOf(listToBeDeleted);

    // let newTodoList = this.todoLists.splice(index,1);

    // let newTodoItem = this.todoItems.filter(item => {
    //     return item.listId !== listId;
    // });

    // this.todolist$.next(newTodoList);
    
    // this.todoitem$.next(newTodoItem);
    return Promise.resolve();
  };


  // private createID(newID: string, todoType: string) {
  //   let listID: any;

  //   if (todoType === 'lists') {
  //     listID = this.todoLists.find(Id => Id._id === newID);
  //   } else {
  //     listID = this.todoItems.find(Id => Id._id === newID);
  //   }

  //   if (listID == undefined) {
  //     return newID;
      
  //   } else if (listID.id == newID) {
  //     newID = Math.ceil(Math.random()*100).toString();
  //     this.createID(newID,todoType);
  //   }
    
  // }
  
}


