import { Injectable } from '@angular/core';
import { Okta } from '../service/okta/okta.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

const swal = require('sweetalert');

@Injectable()
export class AuthGuardService implements CanActivate {
  oktaAuth;
  constructor(private okta: Okta, private router: Router) {
      this.oktaAuth = okta;
    }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if(this.oktaAuth.isAuthenticated()){
          return true;
      }else{
          this.router.navigate(['home']);
          swal('Você precisa efetuar o login para acessar a página!', '', 'error');
          return false;
      }
  }
}
