"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var nivel_service_1 = require("./nivel.service");
describe('NivelService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [nivel_service_1.NivelService]
        });
    });
    it('should be created', testing_1.inject([nivel_service_1.NivelService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=nivel.service.spec.js.map