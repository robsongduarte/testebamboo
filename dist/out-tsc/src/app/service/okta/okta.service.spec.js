"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var okta_service_1 = require("./okta.service");
describe('OktaService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [okta_service_1.OktaService]
        });
    });
    it('should be created', testing_1.inject([okta_service_1.OktaService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=okta.service.spec.js.map