import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Event, Router, RouterEvent, NavigationStart } from '@angular/router';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { AuthState, OktaAuth } from '@okta/okta-auth-js';
import { defer, filter, map, Observable, Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'okta-angular-hash-strategy-example';
  public isAuthenticated$!: Observable<boolean>;
  private destroySub$: Subject<void> = new Subject<void>;

  constructor(private oktaStateService: OktaAuthStateService, @Inject(OKTA_AUTH) private oktaAuth: OktaAuth, private router: Router) {
    // THIS IS JUST A SAMPLE. USE AT YOUR OWN RISK. PLEASE VERIFY ALL PATHS, REFRESHING TOKENS, INTERCEPTOR CALLS, ETC
    // AUTHOR IS NOT RESPONSIBLE FOR ANY BUGS, MAINTENANCE, ERRORS, INSECURE CODING ISSUES
    this.router.events.pipe(
      filter((e: Event): e is RouterEvent => e instanceof RouterEvent && e instanceof NavigationStart),
      filter(() => oktaAuth.isLoginRedirect()),
      switchMap(() => defer(() => oktaAuth.handleLoginRedirect())),
      takeUntil(this.destroySub$)
    ).subscribe(_ => {
      console.log('Login redirect handled');
    });
   }

  public ngOnInit(): void {
    this.isAuthenticated$ = this.oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );
  }

  public ngOnDestroy(): void {
    this.oktaAuth.stop();
    this.destroySub$.next();
    this.destroySub$.complete();
  }

  public async signIn() : Promise<void> {
    await this.oktaAuth.signInWithRedirect();
  }

  public async signOut(): Promise<void> {
    await this.oktaAuth.signOut();
  }
}
