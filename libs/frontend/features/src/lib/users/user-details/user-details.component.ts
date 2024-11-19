import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUserInfo } from '@avans-nx-workshop/shared/api';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-user-details',
    templateUrl: './user-details.component.html',
    styles: []
})
export class UserDetailsComponent implements OnInit, OnDestroy {
    userId!: string | null;
    user: IUserInfo | null = null;
    sub!: Subscription;

    constructor(
        private route: ActivatedRoute,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        console.log('UserDetailComponent onInit');
        // Deze manier is statisch: bij navigatie krijgen we niet de nieuwe id uit de URL.
        // this.userId = this.route.snapshot.paramMap.get('id');

        // Deze manier maakt gebruik van RxJs Observables.
        this.sub = this.route.paramMap.subscribe((params) => {
            this.userId = params.get('id');
            this.user = this.userService.getUserById(this.userId);
            console.log('Got user ' + this.user.name);
        });
    }

    ngOnDestroy(): void {
        console.log('UserDetailComponent onDestroy');
        if (this.sub) {
            console.log('unsubscribing');
            this.sub.unsubscribe;
        }
    }
}
