"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var correios_service_1 = require("./correios.service");
var testing_1 = require("@angular/core/testing");
describe('CorreiosService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [correios_service_1.CorreiosService]
        });
    });
    it('should be created', testing_1.inject([correios_service_1.CorreiosService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=correios.service.spec.js.map