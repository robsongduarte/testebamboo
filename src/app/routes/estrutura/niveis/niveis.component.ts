import { EstruturaNiveis } from '../../../model/estruturaNiveis';
import { EmpresaService } from '../../../service/estrutura/empresa.service';
import { Empresa } from '../../../model/empresa';
import { DateRangeValidator } from '../../../shared/validators/dateRange.validator';
import { DateValidator } from '../../../shared/validators/date.validator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnInit, Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NivelService } from '../../../service/estrutura/nivel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-niveis-component',
  templateUrl: './niveis.component.html',
  styleUrls: ['./niveis.component.scss']
})
export class NiveisComponent implements OnInit {

  formNiveis: FormGroup;
  formPesquisaNivel: FormGroup;

  public empresas: Empresa[] = [];

  public niveis: EstruturaNiveis[] = [];

  public itemsSituacao: any[] = [{'id':true, 'situacao':'Ativa'},
                                 {'id':false, 'situacao':'Inativa'}];
  public nivelFilter: any = [];

  public headElements = ['Nível', 'Início', 'Fim', '',''];                                 

  public ngxSituacao: boolean = true;
  public dataMinima: string;
  public carregarData: string;
  public value: string = null;

  public ngxValueEmpresa: number;

  public dtInicio: Date = new Date();
  public dtFim: Date = new Date();

  constructor(private spinner: NgxSpinnerService,
              private router: Router,
              private fb: FormBuilder,
              private empresaService: EmpresaService,
              private nivelService: NivelService) {
    this.createForm();
  }

  public ngOnInit() {
    this.dataMinima = new Date().toISOString().substr(0, 10).toString();
  }

  createForm() {
    this.carregarData = new Date().toISOString().substr(0, 10).toString();
    this.formNiveis = this.fb
      .group({
        cdEmpresa: [null, Validators.required],
        flAtivo: [null],
        dtVigenciaInicio: [this.carregarData, Validators.compose([Validators.required, DateValidator.dateValidator, DateValidator.dataInvalida])],
        dtVigenciaFim: [this.carregarData, Validators.compose([DateValidator.dateValidator, DateValidator.dataInvalida])],

      }, { validator: DateRangeValidator.dataInicioMaior ('dtVigenciaInicio', 'dtVigenciaFim') });

    this.formPesquisaNivel = this.fb
      .group({pesquisaNivel: [null]});
  }

  carregarDataInicioVigencia() {
    this.dataMinima = this.formNiveis.value.dtVigenciaInicio;
    this.carregarDatas()
  }

  carregarDataFimVigencia() {
    this.carregarDatas()
  }

  carregarDatas() {
    this.dtFim = new Date(this.formNiveis.value.dtVigenciaFim);
    this.dtInicio = new Date(this.formNiveis.value.dtVigenciaInicio);
  }

  limpar() {
    this.createForm();
    this.ngxSituacao = true;
    this.ngxValueEmpresa = 0;
    this.dataMinima = new Date().toISOString().substr(0, 10);
  }

  removerEmpresa() {
    this.empresas = [];
    this.ngxValueEmpresa = null;
    this.formNiveis.patchValue({
      nmEmpresa: null
    });
  }

  onKeyUp(event): void {
    this.value = event.target.value;
    var promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (this.value.length > 0) {
                this.findByName(this.value);
            } else {
                this.empresas = [];
            }
        }, 2000);
        });
  }

  findByName(nmEmpresa: String) {
    this.spinner.show();
    this.empresaService.findByName(nmEmpresa)
    .subscribe(
        (empresas : any) => {
            if (empresas != null) {
                this.empresas = [];
                for (let empresa of empresas) {
                    this.empresas.push(empresa.empresa);
                }
            }
            this.spinner.hide();
        },
        error => console.log(error));
  }

  pesquisar() {
    this.spinner.show();
    this.niveis = [];

    if (this.formNiveis.value.dtVigenciaFim == '') {
      this.formNiveis.value.dtVigenciaFim = null;
    }

    this.nivelService.findNivelByEmpresa(this.formNiveis.value.cdEmpresa,
      this.formNiveis.value.flAtivo, this.formNiveis.value.dtVigenciaInicio, this.formNiveis.value.dtVigenciaFim)
        .subscribe(
          (niveis : any) => {
              if (niveis != null) {
                  for (let nivel of niveis) {
                      this.niveis.push(nivel);
                  }
              }
              this.spinner.hide();
          },
        error => console.log(error));
    this.formPesquisaNivel.patchValue({
      pesquisaNivel: null,
    });
  }

  editar(niveis: EstruturaNiveis) {
    this.router.navigate(['estrutura/niveis-incluir', niveis.cdNivel, false]);
  }

  public incluirNivel() {
    this.router.navigate(['estrutura/niveis-incluir', 0, false]);
  }

}
