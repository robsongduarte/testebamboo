"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DateRangeValidator = /** @class */ (function () {
    function DateRangeValidator() {
    }
    DateRangeValidator.dataInicioMaior = function (inicio, fim) {
        return function (group) {
            var inicioVigencia = group.get(inicio);
            var finalVigencia = group.get(fim);
            if (!inicioVigencia.value || !finalVigencia.value) {
                return undefined;
            }
            if (new Date(inicioVigencia.value) > new Date(finalVigencia.value)) {
                return { dataInicioMaior: true };
            }
            return undefined;
        };
    };
    return DateRangeValidator;
}());
exports.DateRangeValidator = DateRangeValidator;
//# sourceMappingURL=dateRange.validator.js.map