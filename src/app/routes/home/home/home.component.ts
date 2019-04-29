import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Okta } from '../../../service/okta/okta.service';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  oktaSignIn;
  user;

constructor(private oktaAuth: Okta, private changeDetectorRef: ChangeDetectorRef, route:ActivatedRoute, private router: Router) {
        this.oktaSignIn = oktaAuth.getWidget();
         route.params.subscribe(val => {
          this.oktaSignIn.remove();
          this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
          };
        });
    }

  showLogin() {
    this.oktaSignIn.renderEl({el: '#okta-login-container'}, (response) => {
      if (response.status === 'SUCCESS') {
        this.user = response.claims.email;
        this.oktaSignIn.remove();
        this.changeDetectorRef.detectChanges();
        this.oktaSignIn.tokenManager.add('accessToken', response);
      }
    });
  }

 logout() {
    this.oktaSignIn.signOut(() => {
      this.user = undefined;
      this.oktaSignIn.tokenManager.remove('accessToken');
      this.changeDetectorRef.detectChanges();
      this.showLogin();
    });
  }

  ngOnInit() {
     this.authenticate();
  }

  authenticate() {
    this.oktaSignIn.session.get((response) => {
      if (response.status !== 'INACTIVE') {
        this.user = response.login;
        this.changeDetectorRef.detectChanges();
      } else {
        this.showLogin();
      }
    });
  }


}
