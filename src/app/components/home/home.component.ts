import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/core/services/state-srvices.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public listsNum: number;
  public itemsNum: number;
  public activeItems: number = 0;
  public nowDate: Date = new Date(); 


  constructor(private stateService: StateService, private nav: Router) { }

  ngOnInit(): void {

    this.stateService.getAllTodoList().subscribe(lists => this.listsNum = lists.length);
    // this.stateService.getAllTodoItem().subscribe(items => this.itemsNum = items.length);

    this.stateService.getAllTodoItem().subscribe(allItems => {
      this.itemsNum = allItems.length;

      allItems.map((Item) => {          
        if (Item.isCompleted == false) {
          this.activeItems++;
        }
      });
    });

  }


  gotoEdit() {
    this.nav.navigate(['/','lists','-1','edit']);
  }

  gotolists() {
    this.nav.navigate(['/','lists']);
  }

  gotoitems() {
    this.nav.navigate(['/','items']);
  }
}
