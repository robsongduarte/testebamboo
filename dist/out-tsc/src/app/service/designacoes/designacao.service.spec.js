"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var designacao_service_1 = require("./designacao.service");
describe('DesignacaoService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [designacao_service_1.DesignacaoService]
        });
    });
    it('should be created', testing_1.inject([designacao_service_1.DesignacaoService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=designacao.service.spec.js.map