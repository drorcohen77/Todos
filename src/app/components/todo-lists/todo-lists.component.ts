import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/core/services/state-srvices.service';
import { Observable } from 'rxjs';
import { TodoList } from 'src/app/core/models/TodoList.model';

@Component({
  selector: 'app-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.css']
})
export class TodoListsComponent implements OnInit {

  public lists: TodoList[] = [];

  constructor(private stateService: StateService) { }

  async ngOnInit() {

    await this.stateService.todolist.subscribe(allLists => this.lists = allLists);
  }

}
