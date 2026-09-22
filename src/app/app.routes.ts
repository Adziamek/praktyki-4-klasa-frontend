import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { Roles } from './environments/role/roles';
import { Login } from './auth/login/login';
import { Signup } from './auth/signup/signup';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Dashboard } from './main/dashboard/dashboard';
import { Locations } from './main/locations/locations';
import { Settings } from './main/settings/settings';
import { Create } from './main/products/forms/create/create';

import { LandingPage } from './main/landing/landing';

export const routes: Routes = [
    {
        path: '',
        component: LandingPage,
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
                canActivate: [authGuard],
                data: {
                    roles: [
                        Roles.Administrator,
                        Roles.Warehouseman
                    ]
                }
            },
            {
                path: 'settings',
                component: Settings,
                canActivate: [authGuard]
            },
            {
              path: 'create',
              component: Create,
              canActivate: [authGuard]
            }
        ]
    }
];
