import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StateService } from '../../services/state-srvices.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private stateService: StateService, private nav: Router) { }

  ngOnInit(): void {
  }


  gotoHome() {
    this.nav.navigate(['/','home']);
  }

  gotolists() {
    this.stateService.isItemComponent = false;
    this.nav.navigate(['/','lists']);
  }

  gotoitems() {
    this.stateService.isItemComponent = true;
    this.nav.navigate(['/','items']);
  }
}
