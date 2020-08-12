import { Component, OnInit } from '@angular/core';
import { StateService } from './core/services/state-srvices.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  

  constructor(private stateService: StateService) {}

  async ngOnInit() {
  //   this.stateService.getItemsFromList(2).subscribe(res => console.log(res));
  //   this.stateService.getTodoItem(0).subscribe(res => console.log(res));
  //   this.stateService.getTodoList(1).subscribe(res => console.log(res));
  //   console.log(await this.stateService.addList('tree','test3','blue','string'));
  //   console.log(await this.stateService.AddTodoItem(1, 'one'))
  //   this.stateService.ModifyList({
  //     id: 1,
  //     caption: 'four',
  //     description: 'test4',
  //     image_url: 'string',
  //     color: 'green',
  //   })
  //   this.stateService.MarkAsCompleted(1)
  //   this.stateService.DeleteList(2)
  //   this.stateService.todolist.subscribe(todolist => console.log(todolist));
  //   this.stateService.todoitem.subscribe(todoitem => console.log(todoitem));
  }
}
