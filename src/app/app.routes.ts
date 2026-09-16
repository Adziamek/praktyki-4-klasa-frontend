import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Signup } from './auth/signup/signup';
import { authGuard } from './auth/auth.guard';

import { MainLayout } from './layouts/main-layout/main-layout';
import { Dashboard } from './main/dashboard/dashboard';
import { Locations } from './main/locations/locations';
import { Settings } from './main/settings/settings';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: Login,
    },
    {
        path: 'signup',
        component: Signup
    },
    {
        path: '',
        component: MainLayout,
        children: [
            {
                path: 'dashboard',
                component: Dashboard,
                canActivate: [authGuard]
            },
            {
                path: 'locations',
                component: Locations,
                canActivate: [authGuard]
            },
            {
                path: 'settings',
                component: Settings,
                canActivate: [authGuard]
            }
        ]
    }
];
