"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var DateValidator = /** @class */ (function () {
    function DateValidator() {
    }
    DateValidator.dateValidator = function (AC) {
        if (AC && AC.value && !moment(AC.value, 'YYYY-MM-DD', true).isValid()) {
            return { 'dateValidator': true };
        }
        return null;
    };
    DateValidator.dataInvalida = function (AC) {
        if (AC.value != null && new Date(AC.value) < new Date('2000-01-01')) {
            return { dataInvalida: true };
        }
        return null;
    };
    return DateValidator;
}());
exports.DateValidator = DateValidator;
//# sourceMappingURL=date.validator.js.map