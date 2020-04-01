import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from './../../_models/user';
import { UserService } from './../../_services/user.service';
import { AuthenticationService } from './../../_services/authentication.service';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    user: User;

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('currentUser'));
    }
}