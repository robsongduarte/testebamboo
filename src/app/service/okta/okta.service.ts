import { Injectable } from '@angular/core';
import * as OktaSignIn from '@okta/okta-signin-widget/dist/js/okta-sign-in-no-jquery'
import { environment } from './../../../environments/environment';

@Injectable()
export class Okta {
  widget;

constructor() {
    this.widget = new OktaSignIn({
      baseUrl: 'https://dev-691920.oktapreview.com',
      clientId: '0oaj17hcb7CadiHhm0h7',
      redirectUri: environment.url_client,
      authParams: {
        issuer: 'default'
      }
    });
  }

  getWidget() {
    return this.widget;
  }

  isAuthenticated() {
    var token = this.widget.tokenManager.get('accessToken');
    if (token === undefined) {
      return false;
    } else {
      return true;
    }
  }

}
