import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthFacade } from './auth.facade';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authFacade = inject(AuthFacade);
  const router = inject(Router);

  return authFacade.isLogged$.pipe(
    map((isLogged) => {
      if (!isLogged) {
        router.navigate(['/login']);
        return false;
      }

      return true;
    })
  );
};
