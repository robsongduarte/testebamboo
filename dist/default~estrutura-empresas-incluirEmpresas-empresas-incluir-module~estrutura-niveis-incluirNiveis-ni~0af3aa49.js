(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~estrutura-empresas-incluirEmpresas-empresas-incluir-module~estrutura-niveis-incluirNiveis-ni~0af3aa49"],{

/***/ "./node_modules/ngx-currency/index.js":
/*!********************************************!*\
  !*** ./node_modules/ngx-currency/index.js ***!
  \********************************************/
/*! exports provided: CURRENCYMASKDIRECTIVE_VALUE_ACCESSOR, CurrencyMaskDirective, NgxCurrencyModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_currency_mask_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/currency-mask.directive */ "./node_modules/ngx-currency/src/currency-mask.directive.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CURRENCYMASKDIRECTIVE_VALUE_ACCESSOR", function() { return _src_currency_mask_directive__WEBPACK_IMPORTED_MODULE_0__["CURRENCYMASKDIRECTIVE_VALUE_ACCESSOR"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CurrencyMaskDirective", function() { return _src_currency_mask_directive__WEBPACK_IMPORTED_MODULE_0__["CurrencyMaskDirective"]; });

/* harmony import */ var _src_currency_mask_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/currency-mask.module */ "./node_modules/ngx-currency/src/currency-mask.module.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NgxCurrencyModule", function() { return _src_currency_mask_module__WEBPACK_IMPORTED_MODULE_1__["NgxCurrencyModule"]; });



//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ngx-currency/src/currency-mask.config.js":
/*!***************************************************************!*\
  !*** ./node_modules/ngx-currency/src/currency-mask.config.js ***!
  \***************************************************************/
/*! exports provided: CURRENCY_MASK_CONFIG */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CURRENCY_MASK_CONFIG", function() { return CURRENCY_MASK_CONFIG; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");

var CURRENCY_MASK_CONFIG = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]("currency.mask.config");
//# sourceMappingURL=currency-mask.config.js.map

/***/ }),

/***/ "./node_modules/ngx-currency/src/currency-mask.directive.js":
/*!******************************************************************!*\
  !*** ./node_modules/ngx-currency/src/currency-mask.directive.js ***!
  \******************************************************************/
/*! exports provided: CURRENCYMASKDIRECTIVE_VALUE_ACCESSOR, CurrencyMaskDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CURRENCYMASKDIRECTIVE_VALUE_ACCESSOR", function() { return CURRENCYMASKDIRECTIVE_VALUE_ACCESSOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CurrencyMaskDirective", function() { return CurrencyMaskDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _currency_mask_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./currency-mask.config */ "./node_modules/ngx-currency/src/currency-mask.config.js");
/* harmony import */ var _input_handler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./input.handler */ "./node_modules/ngx-currency/src/input.handler.js");




var CURRENCYMASKDIRECTIVE_VALUE_ACCESSOR = {
    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALUE_ACCESSOR"],
    useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function () { return CurrencyMaskDirective; }),
    multi: true,
};
var CurrencyMaskDirective = (function () {
    function CurrencyMaskDirective(currencyMaskConfig, elementRef, keyValueDiffers) {
        this.currencyMaskConfig = currencyMaskConfig;
        this.elementRef = elementRef;
        this.keyValueDiffers = keyValueDiffers;
        this.options = {};
        this.optionsTemplate = {
            align: "right",
            allowNegative: true,
            allowZero: true,
            decimal: ".",
            precision: 2,
            prefix: "$ ",
            suffix: "",
            thousands: ",",
            nullable: false
        };
        if (currencyMaskConfig) {
            this.optionsTemplate = currencyMaskConfig;
        }
        this.keyValueDiffer = keyValueDiffers.find({}).create();
    }
    CurrencyMaskDirective.prototype.ngAfterViewInit = function () {
        this.elementRef.nativeElement.style.textAlign = this.options ? this.options.align : this.optionsTemplate.align;
    };
    CurrencyMaskDirective.prototype.ngDoCheck = function () {
        if (this.keyValueDiffer.diff(this.options)) {
            this.elementRef.nativeElement.style.textAlign = this.options.align ? this.options.align : this.optionsTemplate.align;
            this.inputHandler.updateOptions(Object.assign({}, this.optionsTemplate, this.options));
        }
    };
    CurrencyMaskDirective.prototype.ngOnInit = function () {
        this.inputHandler = new _input_handler__WEBPACK_IMPORTED_MODULE_3__["InputHandler"](this.elementRef.nativeElement, Object.assign({}, this.optionsTemplate, this.options));
    };
    CurrencyMaskDirective.prototype.handleBlur = function (event) {
        this.inputHandler.getOnModelTouched().apply(event);
    };
    CurrencyMaskDirective.prototype.handleCut = function (event) {
        if (!this.isChromeAndroid()) {
            this.inputHandler.handleCut(event);
        }
    };
    CurrencyMaskDirective.prototype.handleInput = function (event) {
        if (this.isChromeAndroid()) {
            this.inputHandler.handleInput(event);
        }
    };
    CurrencyMaskDirective.prototype.handleKeydown = function (event) {
        if (!this.isChromeAndroid()) {
            this.inputHandler.handleKeydown(event);
        }
    };
    CurrencyMaskDirective.prototype.handleKeypress = function (event) {
        if (!this.isChromeAndroid()) {
            this.inputHandler.handleKeypress(event);
        }
    };
    CurrencyMaskDirective.prototype.handlePaste = function (event) {
        if (!this.isChromeAndroid()) {
            this.inputHandler.handlePaste(event);
        }
    };
    CurrencyMaskDirective.prototype.isChromeAndroid = function () {
        return /chrome/i.test(navigator.userAgent) && /android/i.test(navigator.userAgent);
    };
    CurrencyMaskDirective.prototype.registerOnChange = function (callbackFunction) {
        this.inputHandler.setOnModelChange(callbackFunction);
    };
    CurrencyMaskDirective.prototype.registerOnTouched = function (callbackFunction) {
        this.inputHandler.setOnModelTouched(callbackFunction);
    };
    CurrencyMaskDirective.prototype.setDisabledState = function (value) {
        this.elementRef.nativeElement.disabled = value;
    };
    CurrencyMaskDirective.prototype.writeValue = function (value) {
        this.inputHandler.setValue(value);
    };
    return CurrencyMaskDirective;
}());

CurrencyMaskDirective.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{
                selector: "[currencyMask]",
                providers: [CURRENCYMASKDIRECTIVE_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
CurrencyMaskDirective.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: [_currency_mask_config__WEBPACK_IMPORTED_MODULE_2__["CURRENCY_MASK_CONFIG"],] },] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["KeyValueDiffers"], },
]; };
CurrencyMaskDirective.propDecorators = {
    'options': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'handleBlur': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ["blur", ["$event"],] },],
    'handleCut': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ["cut", ["$event"],] },],
    'handleInput': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ["input", ["$event"],] },],
    'handleKeydown': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ["keydown", ["$event"],] },],
    'handleKeypress': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ["keypress", ["$event"],] },],
    'handlePaste': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ["paste", ["$event"],] },],
};
//# sourceMappingURL=currency-mask.directive.js.map

/***/ }),

/***/ "./node_modules/ngx-currency/src/currency-mask.module.js":
/*!***************************************************************!*\
  !*** ./node_modules/ngx-currency/src/currency-mask.module.js ***!
  \***************************************************************/
/*! exports provided: NgxCurrencyModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxCurrencyModule", function() { return NgxCurrencyModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _currency_mask_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./currency-mask.directive */ "./node_modules/ngx-currency/src/currency-mask.directive.js");
/* harmony import */ var _currency_mask_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./currency-mask.config */ "./node_modules/ngx-currency/src/currency-mask.config.js");





var NgxCurrencyModule = (function () {
    function NgxCurrencyModule() {
    }
    NgxCurrencyModule.forRoot = function (config) {
        return {
            ngModule: NgxCurrencyModule,
            providers: [{
                    provide: _currency_mask_config__WEBPACK_IMPORTED_MODULE_4__["CURRENCY_MASK_CONFIG"],
                    useValue: config,
                }]
        };
    };
    return NgxCurrencyModule;
}());

NgxCurrencyModule.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"]],
                declarations: [_currency_mask_directive__WEBPACK_IMPORTED_MODULE_3__["CurrencyMaskDirective"]],
                exports: [_currency_mask_directive__WEBPACK_IMPORTED_MODULE_3__["CurrencyMaskDirective"]]
            },] },
];
/** @nocollapse */
NgxCurrencyModule.ctorParameters = function () { return []; };
//# sourceMappingURL=currency-mask.module.js.map

/***/ }),

/***/ "./node_modules/ngx-currency/src/input.handler.js":
/*!********************************************************!*\
  !*** ./node_modules/ngx-currency/src/input.handler.js ***!
  \********************************************************/
/*! exports provided: InputHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputHandler", function() { return InputHandler; });
/* harmony import */ var _input_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./input.service */ "./node_modules/ngx-currency/src/input.service.js");

var InputHandler = (function () {
    function InputHandler(htmlInputElement, options) {
        this.inputService = new _input_service__WEBPACK_IMPORTED_MODULE_0__["InputService"](htmlInputElement, options);
    }
    InputHandler.prototype.handleCut = function (event) {
        var _this = this;
        setTimeout(function () {
            _this.inputService.updateFieldValue();
            _this.setValue(_this.inputService.value);
            _this.onModelChange(_this.inputService.value);
        }, 0);
    };
    InputHandler.prototype.handleInput = function (event) {
        var keyCode = this.inputService.rawValue.charCodeAt(this.inputService.rawValue.length - 1);
        var rawValueLength = this.inputService.rawValue.length;
        var rawValueSelectionEnd = this.inputService.inputSelection.selectionEnd;
        var storedRawValueLength = this.inputService.storedRawValue.length;
        this.inputService.rawValue = this.inputService.storedRawValue;
        if (rawValueLength != rawValueSelectionEnd || Math.abs(rawValueLength - storedRawValueLength) != 1) {
            this.setCursorPosition(event);
            return;
        }
        if (rawValueLength < storedRawValueLength) {
            this.inputService.removeNumber(8);
        }
        if (rawValueLength > storedRawValueLength) {
            switch (keyCode) {
                case 43:
                    this.inputService.changeToPositive();
                    break;
                case 45:
                    this.inputService.changeToNegative();
                    break;
                default:
                    if (!this.inputService.canInputMoreNumbers) {
                        return;
                    }
                    this.inputService.addNumber(keyCode);
            }
        }
        this.setCursorPosition(event);
        this.onModelChange(this.inputService.value);
    };
    InputHandler.prototype.handleKeydown = function (event) {
        var keyCode = event.which || event.charCode || event.keyCode;
        if (keyCode == 8 || keyCode == 46 || keyCode == 63272) {
            event.preventDefault();
            var selectionRangeLength = Math.abs(this.inputService.inputSelection.selectionEnd - this.inputService.inputSelection.selectionStart);
            if (selectionRangeLength == 0) {
                this.inputService.removeNumber(keyCode);
                this.onModelChange(this.inputService.value);
            }
            if (selectionRangeLength >= (this.inputService.rawValue.length - this.inputService.prefixLength())) {
                this.clearValue();
            }
        }
    };
    InputHandler.prototype.clearValue = function () {
        this.setValue(this.inputService.isNullable() ? null : 0);
        this.onModelChange(this.inputService.value);
    };
    InputHandler.prototype.handleKeypress = function (event) {
        var keyCode = event.which || event.charCode || event.keyCode;
        if (keyCode === 97 && event.ctrlKey) {
            return;
        }
        switch (keyCode) {
            case undefined:
            case 9:
            case 13:
            case 37:
            case 39:
                return;
            case 43:
                this.inputService.changeToPositive();
                break;
            case 45:
                this.inputService.changeToNegative();
                break;
            default:
                if (this.inputService.canInputMoreNumbers) {
                    var selectionRangeLength = Math.abs(this.inputService.inputSelection.selectionEnd - this.inputService.inputSelection.selectionStart);
                    if (selectionRangeLength == this.inputService.rawValue.length) {
                        this.setValue(0);
                    }
                    this.inputService.addNumber(keyCode);
                }
        }
        event.preventDefault();
        this.onModelChange(this.inputService.value);
    };
    InputHandler.prototype.handlePaste = function (event) {
        var _this = this;
        setTimeout(function () {
            _this.inputService.updateFieldValue();
            _this.setValue(_this.inputService.value);
            _this.onModelChange(_this.inputService.value);
        }, 1);
    };
    InputHandler.prototype.updateOptions = function (options) {
        this.inputService.updateOptions(options);
    };
    InputHandler.prototype.getOnModelChange = function () {
        return this.onModelChange;
    };
    InputHandler.prototype.setOnModelChange = function (callbackFunction) {
        this.onModelChange = callbackFunction;
    };
    InputHandler.prototype.getOnModelTouched = function () {
        return this.onModelTouched;
    };
    InputHandler.prototype.setOnModelTouched = function (callbackFunction) {
        this.onModelTouched = callbackFunction;
    };
    InputHandler.prototype.setValue = function (value) {
        this.inputService.value = value;
    };
    InputHandler.prototype.setCursorPosition = function (event) {
        setTimeout(function () {
            event.target.setSelectionRange(event.target.value.length, event.target.value.length);
        }, 0);
    };
    return InputHandler;
}());

//# sourceMappingURL=input.handler.js.map

/***/ }),

/***/ "./node_modules/ngx-currency/src/input.manager.js":
/*!********************************************************!*\
  !*** ./node_modules/ngx-currency/src/input.manager.js ***!
  \********************************************************/
/*! exports provided: InputManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputManager", function() { return InputManager; });
var InputManager = (function () {
    function InputManager(htmlInputElement) {
        this.htmlInputElement = htmlInputElement;
    }
    InputManager.prototype.setCursorAt = function (position) {
        if (this.htmlInputElement.setSelectionRange) {
            this.htmlInputElement.focus();
            this.htmlInputElement.setSelectionRange(position, position);
        }
        else if (this.htmlInputElement.createTextRange) {
            var textRange = this.htmlInputElement.createTextRange();
            textRange.collapse(true);
            textRange.moveEnd("character", position);
            textRange.moveStart("character", position);
            textRange.select();
        }
    };
    InputManager.prototype.updateValueAndCursor = function (newRawValue, oldLength, selectionStart) {
        this.rawValue = newRawValue;
        var newLength = newRawValue.length;
        selectionStart = selectionStart - (oldLength - newLength);
        this.setCursorAt(selectionStart);
    };
    Object.defineProperty(InputManager.prototype, "canInputMoreNumbers", {
        get: function () {
            var haventReachedMaxLength = !(this.rawValue.length >= this.htmlInputElement.maxLength && this.htmlInputElement.maxLength >= 0);
            var selectionStart = this.inputSelection.selectionStart;
            var selectionEnd = this.inputSelection.selectionEnd;
            var haveNumberSelected = !!(selectionStart != selectionEnd &&
                this.htmlInputElement.value.substring(selectionStart, selectionEnd).match(/[^0-9\u0660-\u0669\u06F0-\u06F9]/));
            var startWithZero = (this.htmlInputElement.value.substring(0, 1) == "0");
            return haventReachedMaxLength || haveNumberSelected || startWithZero;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputManager.prototype, "inputSelection", {
        get: function () {
            var selectionStart = 0;
            var selectionEnd = 0;
            if (typeof this.htmlInputElement.selectionStart == "number" && typeof this.htmlInputElement.selectionEnd == "number") {
                selectionStart = this.htmlInputElement.selectionStart;
                selectionEnd = this.htmlInputElement.selectionEnd;
            }
            else {
                var range = document.selection.createRange();
                if (range && range.parentElement() == this.htmlInputElement) {
                    var lenght = this.htmlInputElement.value.length;
                    var normalizedValue = this.htmlInputElement.value.replace(/\r\n/g, "\n");
                    var startRange = this.htmlInputElement.createTextRange();
                    startRange.moveToBookmark(range.getBookmark());
                    var endRange = this.htmlInputElement.createTextRange();
                    endRange.collapse(false);
                    if (startRange.compareEndPoints("StartToEnd", endRange) > -1) {
                        selectionStart = selectionEnd = lenght;
                    }
                    else {
                        selectionStart = -startRange.moveStart("character", -lenght);
                        selectionStart += normalizedValue.slice(0, selectionStart).split("\n").length - 1;
                        if (startRange.compareEndPoints("EndToEnd", endRange) > -1) {
                            selectionEnd = lenght;
                        }
                        else {
                            selectionEnd = -startRange.moveEnd("character", -lenght);
                            selectionEnd += normalizedValue.slice(0, selectionEnd).split("\n").length - 1;
                        }
                    }
                }
            }
            return {
                selectionStart: selectionStart,
                selectionEnd: selectionEnd
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputManager.prototype, "rawValue", {
        get: function () {
            return this.htmlInputElement && this.htmlInputElement.value;
        },
        set: function (value) {
            this._storedRawValue = value;
            if (this.htmlInputElement) {
                this.htmlInputElement.value = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputManager.prototype, "storedRawValue", {
        get: function () {
            return this._storedRawValue;
        },
        enumerable: true,
        configurable: true
    });
    return InputManager;
}());

//# sourceMappingURL=input.manager.js.map

/***/ }),

/***/ "./node_modules/ngx-currency/src/input.service.js":
/*!********************************************************!*\
  !*** ./node_modules/ngx-currency/src/input.service.js ***!
  \********************************************************/
/*! exports provided: InputService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputService", function() { return InputService; });
/* harmony import */ var _input_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./input.manager */ "./node_modules/ngx-currency/src/input.manager.js");

var InputService = (function () {
    function InputService(htmlInputElement, options) {
        this.htmlInputElement = htmlInputElement;
        this.options = options;
        this.PER_AR_NUMBER = new Map();
        this.inputManager = new _input_manager__WEBPACK_IMPORTED_MODULE_0__["InputManager"](htmlInputElement);
        this.initialize();
    }
    InputService.prototype.initialize = function () {
        this.PER_AR_NUMBER.set("\u06F0", "0");
        this.PER_AR_NUMBER.set("\u06F1", "1");
        this.PER_AR_NUMBER.set("\u06F2", "2");
        this.PER_AR_NUMBER.set("\u06F3", "3");
        this.PER_AR_NUMBER.set("\u06F4", "4");
        this.PER_AR_NUMBER.set("\u06F5", "5");
        this.PER_AR_NUMBER.set("\u06F6", "6");
        this.PER_AR_NUMBER.set("\u06F7", "7");
        this.PER_AR_NUMBER.set("\u06F8", "8");
        this.PER_AR_NUMBER.set("\u06F9", "9");
        this.PER_AR_NUMBER.set("\u0660", "0");
        this.PER_AR_NUMBER.set("\u0661", "1");
        this.PER_AR_NUMBER.set("\u0662", "2");
        this.PER_AR_NUMBER.set("\u0663", "3");
        this.PER_AR_NUMBER.set("\u0664", "4");
        this.PER_AR_NUMBER.set("\u0665", "5");
        this.PER_AR_NUMBER.set("\u0666", "6");
        this.PER_AR_NUMBER.set("\u0667", "7");
        this.PER_AR_NUMBER.set("\u0668", "8");
        this.PER_AR_NUMBER.set("\u0669", "9");
    };
    InputService.prototype.addNumber = function (keyCode) {
        if (!this.rawValue) {
            this.rawValue = this.applyMask(false, "0");
        }
        var keyChar = String.fromCharCode(keyCode);
        var selectionStart = this.inputSelection.selectionStart;
        var selectionEnd = this.inputSelection.selectionEnd;
        this.rawValue = this.rawValue.substring(0, selectionStart) + keyChar + this.rawValue.substring(selectionEnd, this.rawValue.length);
        this.updateFieldValue(selectionStart + 1);
    };
    InputService.prototype.applyMask = function (isNumber, rawValue) {
        var _a = this.options, allowNegative = _a.allowNegative, decimal = _a.decimal, precision = _a.precision, prefix = _a.prefix, suffix = _a.suffix, thousands = _a.thousands, nullable = _a.nullable;
        rawValue = isNumber ? new Number(rawValue).toFixed(precision) : rawValue;
        var onlyNumbers = rawValue.replace(/[^0-9\u0660-\u0669\u06F0-\u06F9]/g, "");
        if (!onlyNumbers) {
            return "";
        }
        var integerPart = onlyNumbers.slice(0, onlyNumbers.length - precision)
            .replace(/^\u0660*/g, "")
            .replace(/^\u06F0*/g, "")
            .replace(/^0*/g, "")
            .replace(/\B(?=([0-9\u0660-\u0669\u06F0-\u06F9]{3})+(?![0-9\u0660-\u0669\u06F0-\u06F9]))/g, thousands);
        if (integerPart.startsWith(thousands)) {
            integerPart = integerPart.substring(1);
        }
        if (integerPart == "") {
            integerPart = "0";
        }
        var newRawValue = integerPart;
        var decimalPart = onlyNumbers.slice(onlyNumbers.length - precision);
        if (precision > 0) {
            newRawValue += decimal + decimalPart;
        }
        var isZero = parseInt(integerPart) == 0 && (parseInt(decimalPart) == 0 || decimalPart == "");
        var operator = (rawValue.indexOf("-") > -1 && allowNegative && !isZero) ? "-" : "";
        return operator + prefix + newRawValue + suffix;
    };
    InputService.prototype.clearMask = function (rawValue) {
        if (this.isNullable() && rawValue === "")
            return null;
        var value = (rawValue || "0").replace(this.options.prefix, "").replace(this.options.suffix, "");
        if (this.options.thousands) {
            value = value.replace(new RegExp("\\" + this.options.thousands, "g"), "");
        }
        if (this.options.decimal) {
            value = value.replace(this.options.decimal, ".");
        }
        this.PER_AR_NUMBER.forEach(function (val, key) {
            var re = new RegExp(key, "g");
            value = value.replace(re, val);
        });
        return parseFloat(value);
    };
    InputService.prototype.changeToNegative = function () {
        if (this.options.allowNegative && this.rawValue != "" && this.rawValue.charAt(0) != "-" && this.value != 0) {
            this.rawValue = "-" + this.rawValue;
        }
    };
    InputService.prototype.changeToPositive = function () {
        this.rawValue = this.rawValue.replace("-", "");
    };
    InputService.prototype.removeNumber = function (keyCode) {
        if (this.isNullable() && this.value == 0) {
            this.rawValue = null;
            return;
        }
        var selectionEnd = this.inputSelection.selectionEnd;
        var selectionStart = this.inputSelection.selectionStart;
        if (selectionStart > this.rawValue.length - this.options.suffix.length) {
            selectionEnd = this.rawValue.length - this.options.suffix.length;
            selectionStart = this.rawValue.length - this.options.suffix.length;
        }
        var move = this.rawValue.substr(selectionStart - 1, 1).match(/\d/) ? 0 : -1;
        if ((keyCode == 8 &&
            selectionStart - 1 === 0 &&
            !(this.rawValue.substr(selectionStart, 1).match(/\d/))) ||
            ((keyCode == 46 || keyCode == 63272) &&
                selectionStart === 0 &&
                !(this.rawValue.substr(selectionStart + 1, 1).match(/\d/)))) {
            move = 1;
        }
        ;
        selectionEnd = keyCode == 46 || keyCode == 63272 ? selectionEnd + 1 : selectionEnd;
        selectionStart = keyCode == 8 ? selectionStart - 1 : selectionStart;
        this.rawValue = this.rawValue.substring(0, selectionStart) + this.rawValue.substring(selectionEnd, this.rawValue.length);
        this.updateFieldValue(selectionStart + move);
    };
    InputService.prototype.updateFieldValue = function (selectionStart) {
        var newRawValue = this.applyMask(false, this.rawValue || "");
        selectionStart = selectionStart == undefined ? this.rawValue.length : selectionStart;
        this.inputManager.updateValueAndCursor(newRawValue, this.rawValue.length, selectionStart);
    };
    InputService.prototype.updateOptions = function (options) {
        var value = this.value;
        this.options = options;
        this.value = value;
    };
    InputService.prototype.prefixLength = function () {
        return this.options.prefix.length;
    };
    InputService.prototype.isNullable = function () {
        return this.options.nullable;
    };
    Object.defineProperty(InputService.prototype, "canInputMoreNumbers", {
        get: function () {
            return this.inputManager.canInputMoreNumbers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputService.prototype, "inputSelection", {
        get: function () {
            return this.inputManager.inputSelection;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputService.prototype, "rawValue", {
        get: function () {
            return this.inputManager.rawValue;
        },
        set: function (value) {
            this.inputManager.rawValue = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputService.prototype, "storedRawValue", {
        get: function () {
            return this.inputManager.storedRawValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputService.prototype, "value", {
        get: function () {
            return this.clearMask(this.rawValue);
        },
        set: function (value) {
            this.rawValue = this.applyMask(true, "" + value);
        },
        enumerable: true,
        configurable: true
    });
    return InputService;
}());

//# sourceMappingURL=input.service.js.map

/***/ }),

/***/ "./node_modules/ngx-filter-pipe/esm5/ngx-filter-pipe.js":
/*!**************************************************************!*\
  !*** ./node_modules/ngx-filter-pipe/esm5/ngx-filter-pipe.js ***!
  \**************************************************************/
/*! exports provided: FilterPipeModule, FilterPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterPipeModule", function() { return FilterPipeModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterPipe", function() { return FilterPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FilterPipe = /** @class */ (function () {
    function FilterPipe() {
    }
    /**
     * @param {?} value
     * @param {?} key
     * @return {?}
     */
    FilterPipe.isFoundOnWalking = function (value, key) {
        var /** @type {?} */ walker = value;
        var /** @type {?} */ found = false;
        do {
            if (walker.hasOwnProperty(key) || Object.getOwnPropertyDescriptor(walker, key)) {
                found = true;
                break;
            }
        } while (walker = Object.getPrototypeOf(walker));
        return found;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    FilterPipe.isNumber = function (value) {
        return !isNaN(parseInt(value, 10)) && isFinite(value);
    };
    /**
     * Checks function's value if type is function otherwise same value
     * @param {?} value
     * @return {?}
     */
    FilterPipe.getValue = function (value) {
        return typeof value === 'function' ? value() : value;
    };
    /**
     * @param {?} filter
     * @return {?}
     */
    FilterPipe.prototype.filterByString = function (filter) {
        if (filter) {
            filter = filter.toLowerCase();
        }
        return function (value) { return !filter || (value ? ('' + value).toLowerCase().indexOf(filter) !== -1 : false); };
    };
    /**
     * @param {?} filter
     * @return {?}
     */
    FilterPipe.prototype.filterByBoolean = function (filter) {
        return function (value) { return Boolean(value) === filter; };
    };
    /**
     * @param {?} filter
     * @return {?}
     */
    FilterPipe.prototype.filterByObject = function (filter) {
        var _this = this;
        return function (value) {
            for (var /** @type {?} */ key in filter) {
                if (key === '$or') {
                    if (!_this.filterByOr(filter.$or)(FilterPipe.getValue(value))) {
                        return false;
                    }
                    continue;
                }
                if (!value || !FilterPipe.isFoundOnWalking(value, key)) {
                    return false;
                }
                if (!_this.isMatching(filter[key], FilterPipe.getValue(value[key]))) {
                    return false;
                }
            }
            return true;
        };
    };
    /**
     * @param {?} filter
     * @param {?} val
     * @return {?}
     */
    FilterPipe.prototype.isMatching = function (filter, val) {
        switch (typeof filter) {
            case 'boolean':
                return this.filterByBoolean(filter)(val);
            case 'string':
                return this.filterByString(filter)(val);
            case 'object':
                return this.filterByObject(filter)(val);
        }
        return this.filterDefault(filter)(val);
    };
    /**
     * Filter value by $or
     * @param {?} filter
     * @return {?}
     */
    FilterPipe.prototype.filterByOr = function (filter) {
        var _this = this;
        return function (value) {
            var /** @type {?} */ length = filter.length;
            var /** @type {?} */ arrayComparison = function (i) { return value.indexOf(filter[i]) !== -1; };
            var /** @type {?} */ otherComparison = function (i) { return _this.isMatching(filter[i], value); };
            var /** @type {?} */ comparison = Array.isArray(value) ? arrayComparison : otherComparison;
            for (var /** @type {?} */ i = 0; i < length; i++) {
                if (comparison(i)) {
                    return true;
                }
            }
            return false;
        };
    };
    /**
     * Default filterDefault function
     * @param {?} filter
     * @return {?}
     */
    FilterPipe.prototype.filterDefault = function (filter) {
        return function (value) { return filter === undefined || filter == value; };
    };
    /**
     * @param {?} array
     * @param {?} filter
     * @return {?}
     */
    FilterPipe.prototype.transform = function (array, filter) {
        if (!array) {
            return array;
        }
        switch (typeof filter) {
            case 'boolean':
                return array.filter(this.filterByBoolean(filter));
            case 'string':
                if (FilterPipe.isNumber(filter)) {
                    return array.filter(this.filterDefault(filter));
                }
                return array.filter(this.filterByString(filter));
            case 'object':
                return array.filter(this.filterByObject(filter));
            case 'function':
                return array.filter(filter);
        }
        return array.filter(this.filterDefault(filter));
    };
    return FilterPipe;
}());
FilterPipe.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"], args: [{
                name: 'filterBy',
                pure: false
            },] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] },
];
/** @nocollapse */
FilterPipe.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FilterPipeModule = /** @class */ (function () {
    function FilterPipeModule() {
    }
    return FilterPipeModule;
}());
FilterPipeModule.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                declarations: [FilterPipe],
                providers: [FilterPipe],
                exports: [FilterPipe]
            },] },
];
/** @nocollapse */
FilterPipeModule.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

//# sourceMappingURL=ngx-filter-pipe.js.map


/***/ }),

/***/ "./node_modules/ngx-tabset/esm5/ngx-tabset.js":
/*!****************************************************!*\
  !*** ./node_modules/ngx-tabset/esm5/ngx-tabset.js ***!
  \****************************************************/
/*! exports provided: TabsetComponent, TabComponent, TabsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabsetComponent", function() { return TabsetComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabComponent", function() { return TabComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabsModule", function() { return TabsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/**
 * @license ngx-tabset
 * MIT license
 */




/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var TabComponent = (function () {
    function TabComponent() {
        this.active = false;
        this.disabled = false;
        this.bypassDOM = false;
        this.customPaneClass = '';
    }
    TabComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'ngx-tab',
                    template: "\n    <div *ngIf=\"active\"\n         class=\"pane\"\n         [ngClass]=\"customPaneClass\">\n      <div *ngIf=\"bypassDOM\">\n        <ng-container [ngTemplateOutlet]=\"template\"></ng-container>\n      </div>\n      <div *ngIf=\"!bypassDOM\">\n        <ng-content></ng-content>\n      </div>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    TabComponent.ctorParameters = function () { return []; };
    TabComponent.propDecorators = {
        "tabTitle": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "active": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "disabled": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "bypassDOM": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "customPaneClass": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "template": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ContentChild"], args: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"],] },],
    };
    return TabComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var TabsetComponent = (function () {
    function TabsetComponent() {
        this.disableStyle = false;
        this.customNavClass = '';
        this.customTabsClass = '';
        this.onSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    /**
     * @return {?}
     */
    TabsetComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        // get all active tabs
        var /** @type {?} */ activeTabs = this.tabs.filter(function (tab) { return tab.active; });
        // if there is no active tab set, activate the first
        if (activeTabs.length === 0) {
            this.selectTab(this.tabs.first);
        }
    };
    /**
     * @param {?} tabToSelect
     * @return {?}
     */
    TabsetComponent.prototype.selectTab = /**
     * @param {?} tabToSelect
     * @return {?}
     */
    function (tabToSelect) {
        if (tabToSelect.disabled === true || tabToSelect.active === true) {
            return;
        }
        // deactivate all tabs
        this.tabs.toArray().forEach(function (tab) { return tab.active = false; });
        // activate the tab the user has clicked on.
        tabToSelect.active = true;
        this.onSelect.emit(this.tabs.toArray().indexOf(tabToSelect));
    };
    TabsetComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'ngx-tabset',
                    template: "\n    <ul class=\"nav-tabset\"\n        [class.disable-style]=\"disableStyle\"\n        [ngClass]=\"customNavClass\">\n      <li *ngFor=\"let tab of tabs\"\n          (click)=\"selectTab(tab)\"\n          class=\"nav-tab\"\n          [class.active]=\"tab.active\"\n          [class.disabled]=\"tab.disabled\">\n        <span>{{ tab.tabTitle }}</span>\n      </li>\n    </ul>\n    <div class=\"tabs-container\"\n         [ngClass]=\"customTabsClass\">\n      <ng-content></ng-content>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    TabsetComponent.ctorParameters = function () { return []; };
    TabsetComponent.propDecorators = {
        "tabs": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ContentChildren"], args: [TabComponent,] },],
        "disableStyle": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "customNavClass": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "customTabsClass": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "onSelect": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    };
    return TabsetComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var TabsModule = (function () {
    function TabsModule() {
    }
    /**
     * Use in AppModule: new instance of NgxTabset.
     * @return {?}
     */
    TabsModule.forRoot = /**
     * Use in AppModule: new instance of NgxTabset.
     * @return {?}
     */
    function () {
        return {
            ngModule: TabsModule,
            providers: []
        };
    };
    /**
     * Use in features modules with lazy loading: new instance of NgxTabset.
     * @return {?}
     */
    TabsModule.forChild = /**
     * Use in features modules with lazy loading: new instance of NgxTabset.
     * @return {?}
     */
    function () {
        return {
            ngModule: TabsModule,
            providers: []
        };
    };
    TabsModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                    declarations: [
                        TabComponent,
                        TabsetComponent,
                    ],
                    exports: [
                        TabComponent,
                        TabsetComponent,
                    ],
                    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]]
                },] },
    ];
    /** @nocollapse */
    TabsModule.ctorParameters = function () { return []; };
    return TabsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
// Public classes.

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Entry point for all public APIs of the package.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */


//# sourceMappingURL=ngx-tabset.js.map


/***/ })

}]);
//# sourceMappingURL=default~estrutura-empresas-incluirEmpresas-empresas-incluir-module~estrutura-niveis-incluirNiveis-ni~0af3aa49.js.map