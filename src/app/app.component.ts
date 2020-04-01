import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './../_services/authentication.service';
import { User } from './../_models/user';

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}

    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}