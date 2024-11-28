import { Route } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutComponent } from './components/about/about.component';
import {
    UserDetailsComponent,
    UserEditComponent,
    UserListComponent,
    DriverListComponent,
    DriverCreateComponent,
    DriverEditComponent,
    ConstructorListComponent
} from '@avans-nx-workshop/features';

export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'about', component: AboutComponent },
    { path: 'users', component: UserListComponent },
    { path: 'users/:id', component: UserDetailsComponent },
    { path: 'users/new', component: UserEditComponent },
    { path: 'users/:id/edit', component: UserEditComponent },
    { path: 'drivers', component: DriverListComponent },
    { path: 'drivers/create', component: DriverCreateComponent },
    { path: 'drivers/:id/edit', component: DriverEditComponent },
    { path: 'constructors', component: ConstructorListComponent },
    { path: '**', redirectTo: 'dashboard' }
];
