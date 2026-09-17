import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "../service/auth-service/auth-service";
import { map } from "rxjs/operators";

export const authGuard: CanActivateFn = (route) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const allowedRoles = route.data['roles'] as string[] | undefined;
    
    // TODO: Make redirect to unauthorized page
    const redirectTo = '/login';

    return authService.getUserRole().pipe(
        map(role => {
            if (!role)
                return router.createUrlTree([redirectTo]);
        
            if (!allowedRoles) 
                return true;

            if (allowedRoles.includes(role))
                return true

            return router.createUrlTree([redirectTo]);
        })
    );
}