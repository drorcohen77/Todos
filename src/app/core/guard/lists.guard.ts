import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

import { StateService } from '../services/state-srvices.service';
import { TodoList } from '../models/TodoList.model';

@Injectable({
    providedIn: 'root'
})

export class ListsGuard implements CanActivate {

    private lists: TodoList[];

    constructor(private router: Router, private stateService: StateService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {

        this.stateService.todolist.subscribe(allLists => this.lists = allLists);
        
        if (this.lists.length == 0) {
            this.router.navigate(['/lists/-1/edit']);
            return false;
        }
        return true;
    }
}