import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "../service/auth-service/auth-service";
import { map } from "rxjs/operators";

export const authGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.isLoggedIn().pipe(
        map(isLoggedIn => {
            if (isLoggedIn) {
                return true;
            }

            return router.createUrlTree(['/login']);
        })
    );
}