import { Routes } from '@angular/router';
import { Signup } from './auth/signup/signup';
import { authGuard } from './auth/auth.guard';
import { Dashboard } from './main/dashboard/dashboard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () =>
            import('./auth/login/login').then(m => m.Login)
    },
    {
        path: 'signup',
        component: Signup
    },
    {
        path: 'dashboard',
        component: Dashboard,
        canActivate: [authGuard]
    }
];
