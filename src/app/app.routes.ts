import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { Roles } from './environments/role/roles';
import { Login } from './auth/login/login';
import { Signup } from './auth/signup/signup';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Dashboard } from './main/dashboard/dashboard';
import { Locations } from './main/locations/locations';
import { Settings } from './main/settings/settings';
import { Products } from './main/products/products';

import { LandingPage } from './main/landing/landing';
import {ShoppingCart} from './main/shopping-cart/shopping-cart';
import { Catalog } from './main/catalog/catalog';
import { MyOrders } from './main/my-orders/my-orders';

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
              path: 'products',
              component: Products,
              canActivate: [authGuard],
              data: {
                roles: [
                  Roles.Administrator,
                  Roles.Warehouseman
                ]
              }
            },
            {
              path: 'catalog',
              component: Catalog,
              canActivate: [authGuard],
              data: {
                roles: [Roles.User]
              }
            },
            {
              path: 'my-orders',
              component: MyOrders,
              canActivate: [authGuard],
              data: {
                roles: [Roles.User]
              }
            },
            {
              path: 'cart',
              component: ShoppingCart,
              canActivate: [authGuard]
            }
        ]
    }
];
