import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUserInfo } from '@avans-nx-workshop/shared/api';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-user-list',
    templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit, OnDestroy {
    users: IUserInfo[] | undefined = undefined;
    sub?: Subscription;

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        console.log('UserListComponent onInit');

        // Synchrone manier: geen zichtbare vertraging
        // this.users = this.userService.getUsers();

        // Asynchroon: met Reactive Programming
        this.sub = this.userService
            .getUsersAsObservable()
            .subscribe((users) => (this.users = users));
    }

    ngOnDestroy(): void {
        if (this.sub) {
            console.log('UNSUBSCRIBE');
            this.sub.unsubscribe();
        }
        console.log('UserListComponent onDestroy');
    }
}
