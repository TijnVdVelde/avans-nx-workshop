import { Route } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutComponent } from './components/about/about.component';
import { UserDetailsComponent, UserEditComponent, UserListComponent, DriverListComponent } from '@avans-nx-workshop/features';

export const appRoutes: Route[] = [
    // Default route
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

    // Dashboard and about pages
    { path: 'dashboard', component: DashboardComponent },
    { path: 'about', component: AboutComponent },

    // User routes
    { path: 'users', component: UserListComponent },
    { path: 'users/:id', component: UserDetailsComponent },
    { path: 'users/new', component: UserEditComponent },
    { path: 'users/:id/edit', component: UserEditComponent },

    // Driver routes
    { path: 'drivers', component: DriverListComponent },

    // Wildcard route for undefined paths
    { path: '**', redirectTo: 'dashboard' }
];
