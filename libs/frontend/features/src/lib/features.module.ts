import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';

import { DriverListComponent } from './drivers/driver-list/driver-list.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule // For navigation
    ],
    declarations: [UserDetailsComponent, UserListComponent, UserEditComponent, DriverListComponent],
    exports: [UserDetailsComponent, UserListComponent, UserEditComponent, DriverListComponent]
})
export class FeaturesModule {}
