import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const flag = localStorage.getItem('actualuser');

  if (!flag) {
    return false;
  } else {
    return true;
  }
};
