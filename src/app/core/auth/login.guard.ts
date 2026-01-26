import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthFacade } from './auth.facade';
import { map } from 'rxjs';

export const loginGuard: CanActivateFn = () => {
  const authFacade = inject(AuthFacade);
  const router = inject(Router);

  return authFacade.isLogged$.pipe(
    map(isLogged => {
      if (isLogged) {
        router.navigate(['/patients']);
        console.log('loginGuard: redirecting to /patients because user is logged in');
        return false;
      }
      console.log('loginGuard: allowing access to /login because user is not logged in');
      return true;
    })
  );
};
