import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { AuthState, CustomUserClaims, UserClaims } from '@okta/okta-auth-js';
import { defer, filter, map, of, switchMap } from 'rxjs';

export const userProfileResolver: ResolveFn<string> =
(route, state, oktaAuthStateService = inject(OktaAuthStateService), oktaAuth = inject(OKTA_AUTH)) => {
  return oktaAuthStateService.authState$.pipe(
    filter((authState: AuthState) => !!authState.isAuthenticated),
    switchMap(_ => defer(() => oktaAuth.token.getUserInfo())),
    map((userClaims:UserClaims<CustomUserClaims>) => (userClaims.preferred_username ?? 'Awesome dev'))
  );
};

