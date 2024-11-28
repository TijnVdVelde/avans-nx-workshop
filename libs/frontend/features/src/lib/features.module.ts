import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';

import { DriverListComponent } from './drivers/driver-list/driver-list.component';
import { DriverCreateComponent } from './drivers/driver-create/driver-create.component';
import { DriverEditComponent } from './drivers/driver-edit/driver-edit.component';

import { ConstructorListComponent } from './constructors/constructor-list/constructor-list.component';
import { ConstructorCreateComponent } from './constructors/constructor-create/constructor-create.component';
import { ConstructorEditComponent } from './constructors/constructor-edit/constructor-edit.component';

@NgModule({
    imports: [CommonModule, RouterModule, FormsModule],
    declarations: [
        UserDetailsComponent,
        UserListComponent,
        UserEditComponent,
        DriverListComponent,
        DriverCreateComponent,
        DriverEditComponent,
        ConstructorListComponent,
        ConstructorCreateComponent,
        ConstructorEditComponent
    ],
    exports: [
        UserDetailsComponent,
        UserListComponent,
        UserEditComponent,
        DriverListComponent,
        DriverCreateComponent,
        DriverEditComponent,
        ConstructorListComponent,
        ConstructorCreateComponent,
        ConstructorEditComponent
    ]
})
export class FeaturesModule {}
