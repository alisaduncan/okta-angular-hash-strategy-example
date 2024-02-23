# Angular HashStrategy Sample Code for Integrating with Okta using the Redirect Model

This repository contains a sample of integrating with [Okta](https://www.okta.com/) for authentication using [the redirect model in an Angular app](https://developer.okta.com/docs/guides/sign-into-spa/angular/main/) with hash location strategy enabled.

> **NOTE**
>
> This code is not vetted or even tested. It's a quick sample and may contain bugs, errors, security issues, etc. Use it at your own risk.
> **The author is not responsible for any issues that stem from using this code.**

The sample uses the [Okta Angular SDK](https://github.com/okta/okta-angular) and [Okta Auth JavaScript SDK](https://github.com/okta/okta-auth-js). Read more about getting started with Okta and authentication best practices on the [Okta Developer Portal](https://developer.okta.com).


## Getting started

To run this example, run the following commands:

```shell
git clone https://github.com/alisaduncan/okta-angular-hash-strategy-example.git
cd okta-angular-hash-strategy-example
npm ci
```

## Create an OIDC application in Okta

Create a free developer account with the following command using the [Okta CLI](https://cli.okta.com/):

```shell
okta register
```

If you already have a developer account, use `okta login` to integrate it with the Okta CLI.

Provide the required information. Once you register, create a client application in Okta with the following command:

```shell
okta apps create
```

You will be prompted to select the following options:
* Type of Application: **2: SPA**
* Redirect URI: `http://localhost:4200/login/callback`
* Logout Redirect URI: `http://localhost:4200`

The application configuration will be printed to your screen:

```
Okta application configuration:
Issuer:    https://<OKTA_DOMAIN>.okta.com/oauth2/default
Client ID: <CLIENT_ID>
```

Update src/app/app.module.ts with your Okta settings.

```ts
const oktaAuth = new OktaAuth({
  clientId: '{yourClientID}',
  issuer: 'https://{yourOktaDomain}/oauth2/default',
  redirectUri: window.location.origin + '/login/callback'
});
```

Start the app by running

```shell
npm start
```

Spec files have been updated to demonstrate how to configure the `TestBed` and provide a spy in place of Okta services.

Run tests by

```shell
npm run test
```

## Helpful resources
* [Learn about Authentication, OAuth 2.0, and OpenID Connect](https://developer.okta.com/docs/concepts/)
* [Get started with Angular](https://angular.io/start)
* [Angular developer guide](https://angular.io/guide/developer-guide-overview)

## Help

Please visit our [Okta Developer Forums](https://devforum.okta.com/).
