import { Component, OnInit } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { TodoList } from 'src/app/core/models/TodoList.model';
import { StateService } from 'src/app/core/services/state-srvices.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { TodoItem } from 'src/app/core/models/TodoItem.model';



@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.css']
})
export class ListDetailsComponent implements OnInit {

  public todoList$: Observable<TodoList>;
  public listItems$: Observable<TodoItem[]>;
  public delClicked: boolean = false;
  private listeID: number;


  constructor(
    private stateService: StateService, 
    private rout: ActivatedRoute,
    private nav: Router
  ) { }

  ngOnInit(): void {

    const listid$ = this.rout.params.pipe(
        map(urlid => +urlid['id'])
      );
      
    listid$.subscribe(id => this.listeID = id);

    this.todoList$ = listid$.pipe(
        switchMap(id => this.stateService.getTodoList(id))
      );
    
    this.listItems$ = this.todoList$.pipe(
        switchMap(() => this.stateService.getItemsFromList(this.listeID))
      );
      // this.stateService.getItemsFromList(this.listeID)
    // this.todoList$ = this.rout.params.pipe(
    //     map(urlid => { this.listeID = +urlid['id']; return +urlid['id']; }),
    //     switchMap(id => this.stateService.getTodoList(id))
    //   );


    

      // this.todoList$ = listid$.pipe(
    //     switchMap(id => this.stateService.getTodoList(id))
    //   );

    // this.listItems$ = this.todoList$.pipe(switchMap(listitems => this.stateService.getItemsFromList(listitems.id)))
    // this.todoList$ = this.rout.params.pipe(
    //     map(urlid => urlid['id']),
    //     switchMap(id => this.stateService.getTodoList(id))
    //   );

    // this.todoList$.pipe(
    //   map(listid => this.stateService.getItemsFromList(listid.id))
    //   )
    //   .subscribe(x => this.listItems$ = x);
    // console.log(this.listeID)
    // this.todoList$.subscribe(x=>console.log(x))
    // this.listItems$.subscribe(x=>console.log(x))
  }


  onNewList() {
    this.nav.navigate(['/','lists','-1','edit']);
  }

  onEditList() {
    this.nav.navigate(['/','lists',this.listeID,'edit']);
  }

  onDeleteList() {
    this.delClicked = true;
  }

  onConfirmDelete() {
    this.stateService.DeleteList(this.listeID);
    this.nav.navigate(['/','lists']);
  }

  onCancleDelete() {
    this.delClicked = false;
  }
}
