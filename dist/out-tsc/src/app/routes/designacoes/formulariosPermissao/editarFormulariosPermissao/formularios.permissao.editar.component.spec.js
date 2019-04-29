"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var formularios_permissao_editar_component_1 = require("./formularios.permissao.editar.component");
describe('FormularioPermissaoEditarComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [formularios_permissao_editar_component_1.FormulariosPermissaoEditarComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(formularios_permissao_editar_component_1.FormulariosPermissaoEditarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=formularios.permissao.editar.component.spec.js.map