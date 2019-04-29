"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var okta_service_1 = require("../../../service/okta/okta.service");
var router_1 = require("@angular/router");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(oktaAuth, changeDetectorRef, route, router) {
        var _this = this;
        this.oktaAuth = oktaAuth;
        this.changeDetectorRef = changeDetectorRef;
        this.router = router;
        console.log('home');
        this.oktaSignIn = oktaAuth.getWidget();
        route.params.subscribe(function (val) {
            _this.oktaSignIn.remove();
            _this.router.routeReuseStrategy.shouldReuseRoute = function () {
                return false;
            };
        });
    }
    HomeComponent.prototype.showLogin = function () {
        var _this = this;
        this.oktaSignIn.renderEl({ el: '#okta-login-container' }, function (response) {
            if (response.status === 'SUCCESS') {
                _this.user = response.claims.email;
                _this.oktaSignIn.remove();
                _this.changeDetectorRef.detectChanges();
                _this.oktaSignIn.tokenManager.add('accessToken', response);
            }
        });
    };
    HomeComponent.prototype.logout = function () {
        var _this = this;
        this.oktaSignIn.signOut(function () {
            _this.user = undefined;
            _this.oktaSignIn.tokenManager.remove('accessToken');
            _this.changeDetectorRef.detectChanges();
            _this.showLogin();
        });
    };
    HomeComponent.prototype.ngOnInit = function () {
        this.authenticate();
    };
    HomeComponent.prototype.authenticate = function () {
        var _this = this;
        this.oktaSignIn.session.get(function (response) {
            if (response.status !== 'INACTIVE') {
                _this.user = response.login;
                _this.changeDetectorRef.detectChanges();
            }
            else {
                _this.showLogin();
            }
        });
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.scss']
        }),
        __metadata("design:paramtypes", [okta_service_1.Okta, core_1.ChangeDetectorRef, router_1.ActivatedRoute, router_1.Router])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map