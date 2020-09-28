import { Component, OnInit, OnDestroy } from '@angular/core';
import { StateService } from 'src/app/core/services/state-srvices.service';
import { Observable, Subscription } from 'rxjs';
import { TodoList } from 'src/app/core/models/TodoList.model';

@Component({
  selector: 'app-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.css']
})
export class TodoListsComponent implements OnInit, OnDestroy {

  private sub: Subscription;
  public lists: TodoList[] = [];
  public list_view: boolean = true;
  public iconColor: string = 'gray';

  constructor(private stateService: StateService) { }

  async ngOnInit() {

    this.sub = await this.stateService.todolist.subscribe(allLists => this.lists = allLists);
  }


  onViewList() {
    // this.list_view? this.list_view = false : this.list_view = true;
    if (this.list_view) {
      this.list_view = false;
      this.iconColor = '#ff4081';
    } else {
      this.list_view = true;
      this.iconColor = 'gray';
    }; 
  };

  
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }


}
