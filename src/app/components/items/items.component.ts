import { Component, OnInit, Input } from '@angular/core';

import { StateService } from 'src/app/core/services/state-srvices.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { WordsValidators } from '../../core/MyValidators/words-validator'
import { TodoItem } from 'src/app/core/models/TodoItem.model';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  @Input() ListItems$;

  public listItems: TodoItem[];
  public addItem: FormGroup;
  // public ListItems: Observable<TodoItem[]>

  // public addItem = this.fb.group({
  //   newItem: ['',
  //     Validators.minLength(10),
  //     WordsValidators.minWords(5)
  //   ]
  // });

  
  constructor(private stateService: StateService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.ListItems$.subscribe(items => this.listItems = items);

    this.buildAddItem();
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

  onTurnCompleted(itemId: number){
    // this.ListItems$ = this.ListItems$.pipe(switchMap(items => items = []));
    // console.log(this.ListItems$)
    this.stateService.MarkAsCompleted(itemId);
  }

  onSubmit() {
    this.stateService.AddTodoItem(this.listItems[0].listId, this.addItem.value['newItem'])

    console.log(this.listItems, this.addItem.value['newItem'] )
    this.addItem.reset();
  }

}
