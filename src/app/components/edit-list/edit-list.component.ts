import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { StateService } from 'src/app/core/services/state-srvices.service';
import { FormDataService } from 'src/app/core/services/form-data.service';
import { IconsColors } from 'src/app/core/models/IconsColor.model';
import { WordsValidators } from 'src/app/core/MyValidators/words-validator';



@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css']
})
export class EditListComponent implements OnInit {

  public list: any;
  public ID: number;
  public icons = IconsColors.icons;
  public colors = IconsColors.colors;

  public editForm: FormGroup;

  // editForm = this.fb.group({
  //   caption: ['', 
  //     Validators.required,
  //     Validators.maxLength(15),
  //     (ctrl) => this.formData.validateCaption(ctrl)
  //   ],
  //   description: ['',
  //     Validators.required,
  //     Validators.maxLength(60),
  //     WordsValidators.minWords(10)
  //   ],
  //   icon: ['',Validators.required],
  //   color: ['',Validators.required]
  // });
 

  constructor(
    private rout: ActivatedRoute, 
    private stateService: StateService,
    private formData: FormDataService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.rout.params.pipe(
        map(listid => this.ID = +listid['id']), // to extract the ':id' from the "/lists/:id/edit" url
        switchMap( id => this.stateService.getTodoList(id) ) // get from service the a list by id and switching the return from id: Observable to list: Observable 
      )
      .subscribe(reslist => this.list = reslist); // subscribe to extract list: TodoList from Observable

    if (this.ID === -1) {
      this.list = '';
    }

    this.buildEditForm();
  }


  buildEditForm() {

    this.editForm = new FormGroup ({
      caption: new FormControl(this.list.caption, [
        Validators.required,
        Validators.maxLength(15)
      ],
        (ctrl) => this.formData.validateCaption(ctrl)
      ),
      description: new FormControl(this.list.description, [
        Validators.maxLength(60),
        Validators.required,
        WordsValidators.minWords(10)
      ]),
      icon: new FormControl(this.list.icon,Validators.required),
      color: new FormControl(this.list.color,Validators.required)
    });
    
  }


  onSubmit() {
    this.list = this.editForm.value;

    if (this.ID === -1) {
      this.stateService.addList(
        this.list.caption,
        this.list.description,
        this.list.icon,
        this.list.color
      );
    } else {
      this.stateService.ModifyList(this.editForm.value);
    }

    this.editForm.reset();
  }

}