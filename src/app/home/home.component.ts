import { Component, OnInit } from '@angular/core';

import { User } from './../../_models/user';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    loading = false;
    user: User;

    constructor() { }

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('currentUser'));
    }
}
