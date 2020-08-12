import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StateService } from 'src/app/core/services/state-srvices.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TodoList } from 'src/app/core/models/TodoList.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormDataService } from 'src/app/core/services/form-data.service';
import { IconsColors } from 'src/app/core/models/IconsColor.model';
import { WordsValidators } from 'src/app/core/MyValidators/words-validator';



@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css']
})
export class EditListComponent implements OnInit {

  public listID$: Observable<number>;
  public list$: Observable<TodoList>;
  public ID: number;
  public icons = IconsColors.icons;
  public colors = IconsColors.colors;

  public editForm: FormGroup;

  constructor(
    private rout: ActivatedRoute, 
    private stateService: StateService,
    private formData: FormDataService
  ) { }

  ngOnInit(): void {
    this.listID$ = this.rout.params.pipe(
      map(listid => +listid['id'])
    );
    
    this.listID$.subscribe(id => this.ID = id);
    
    if (this.ID !== -1) {
        this.list$ = this.listID$.pipe(
          switchMap( id => this.stateService.getTodoList(id) )
      );
    }
    
    this.buildEditForm();
  }


  buildEditForm() {
    this.editForm = new FormGroup ({
      caption: new FormControl('', [
        Validators.required,
        Validators.maxLength(15)],
        (ctrl) => this.formData.validateCaption(ctrl)
      ),
      description: new FormControl('', [
        Validators.maxLength(60),
        Validators.required,
        WordsValidators.minWords(10)
      ]),
      icon: new FormControl('',Validators.required),
      color: new FormControl('',Validators.required)
    });
    console.log(this.editForm)
  }


  onSubmit() {
    console.log(this.editForm.value)
  }
}