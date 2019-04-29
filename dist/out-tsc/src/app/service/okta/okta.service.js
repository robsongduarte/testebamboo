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
var OktaSignIn = require("@okta/okta-signin-widget/dist/js/okta-sign-in-no-jquery");
var environment_1 = require("./../../../environments/environment");
var Okta = /** @class */ (function () {
    function Okta() {
        this.widget = new OktaSignIn({
            baseUrl: 'https://dev-691920.oktapreview.com',
            clientId: '0oaj17hcb7CadiHhm0h7',
            redirectUri: environment_1.environment.url_client,
            authParams: {
                issuer: 'default'
            }
        });
    }
    Okta.prototype.getWidget = function () {
        return this.widget;
    };
    Okta.prototype.isAuthenticated = function () {
        var token = this.widget.tokenManager.get('accessToken');
        if (token === undefined) {
            return false;
        }
        else {
            return true;
        }
    };
    Okta = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], Okta);
    return Okta;
}());
exports.Okta = Okta;
//# sourceMappingURL=okta.service.js.map