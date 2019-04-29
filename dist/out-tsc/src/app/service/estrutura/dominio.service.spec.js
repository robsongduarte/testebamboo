"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dominio_service_1 = require("./dominio.service");
var testing_1 = require("@angular/core/testing");
describe('DominioService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [dominio_service_1.DominioService]
        });
    });
    it('should be created', testing_1.inject([dominio_service_1.DominioService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=dominio.service.spec.js.map