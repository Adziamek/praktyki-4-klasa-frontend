import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "./auth-service";
import { map } from "rxjs/operators";

export const authGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const isTokenValid = authService.isLoggedIn()

    return authService.isLoggedIn().pipe(
        map(isLoggedIn => {
            if (isLoggedIn) {
                return true;
            }

            return router.createUrlTree(['/login']);
        })
    );
}