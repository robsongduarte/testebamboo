import { NivelAnexo } from './../../../../model/nivelAnexo';
import { AnexoNivelService } from './../../../../service/estrutura/anexo-nivel.service';
import { DesignacaoService } from './../../../../service/designacoes/designacao.service';
import { DatePipe } from '@angular/common';
import { Empresa } from './../../../../model/empresa';
import { OrganogramaNiveis } from './../../../../model/organograma.niveis';
import { DateValidator } from './../../../../shared/validators/date.validator';
import { DateRangeValidator } from './../../../../shared/validators/dateRange.validator';
import { TipoNivel } from './../../../../model/tipoNivel';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NivelService } from '../../../../service/estrutura/nivel.service';
import { Localidade } from '../../../../model/localidade';
import { LocalidadeService } from '../../../../service/estrutura/localidade.service';
import { TreeNode, TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';
import { Nivel } from '../../../../model/nivel';
import { EmpresaService } from '../../../../service/estrutura/empresa.service';
import { TipoNivelService } from '../../../../service/estrutura/tipo.nivel.service';
import { designacaoNivelDTO } from '../../../../model/designacao.nivel.dto';

const swal = require('sweetalert2');

const actionMapping: IActionMapping = {
  mouse: {
      contextMenu: (tree, node, $event) => {
          $event.preventDefault();
          alert(`context menu for ${node.data.name}`);
      },
      click: (tree, node, $event) => {
          $event.shiftKey
              ? TREE_ACTIONS.TOGGLE_ACTIVE_MULTI(tree, node, $event)
              : TREE_ACTIONS.TOGGLE_ACTIVE(tree, node, $event);
      }
  }
};

@Component({
  selector: 'app-niveis-incluir',
  templateUrl: './niveis.incluir.component.html',
  styleUrls: ['./niveis.incluir.component.scss']
})
export class NiveisIncluirComponent implements OnInit {

  formNivelIncluir: FormGroup;
  formNivelEstrutura: FormGroup;

  public headDesignado = ['Designado', 'Título', 'Tipo Designação', 'Início', 'Fim', ' '];

  public empresas: Empresa[] = [];
  public tipoNiveis: TipoNivel[] = [];
  public localidades: Localidade[] = [];
  public organogramaNiveis: OrganogramaNiveis[] = [];
  public designados: designacaoNivelDTO[] = [];
  public designadoFilter: any = [];

  public nivel: Nivel;
  public nivelPai: Nivel;
  public localidade: Localidade;
  public tipoNivel: TipoNivel;
  public organogramaNivel: OrganogramaNiveis;
  public empresa: Empresa;

  public dataMinima: string;
  public jsonOrganograma: string;
  public estruturaNivel: string;
  public value: string = null;
  public dsEstrutura: string = null;
  public cdNivelSelecionado: string;

  public id: number;
  public index: number;
  public cdNivel: number;  
  public cdNivelEstrutura: number = 0;
  public cdEmpresa: number;
  public indexLocalidade: number;
  public ngxTipoNivel: number;
  public ngxLocalidade: number = 0;
  public ngxValueEmpresa: number = 0;
  public p: number;


  public nivelSelecionado: any;

  public item: any;

  public childrenOfNivel: any = {};

  public parentId: number;

  public dtInicio: Date = new Date();
  public dtFim: Date = new Date();

  public edicao: boolean = false;
  public habilitarTipoNivel: boolean = true;
  public habilitarLocalidade: boolean = true;
  public mostrarDescricaoNivel: boolean = false;
  public habilitarTabs: boolean = true;
  public organograma: boolean = false;

  public nodes: any[] = null;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private spinner: NgxSpinnerService,
              private nivelService: NivelService,
              private anexoNivelService: AnexoNivelService,
              private localidadeService: LocalidadeService,
              private empresaService: EmpresaService,
              private tipoNivelService: TipoNivelService,
              private datePipe: DatePipe,
              private designacaoService: DesignacaoService,
              private router: Router) {    

  }

  ngOnInit() {    
    this.creatForm();
    this.route.params.subscribe((params)=> {      
      this.cdNivel = params['id'];
      this.organograma = JSON.parse(params['organograma']);
    });
    if (this.cdNivel > 0) {      
      this.spinner.show();
      this.habilitarTabs = false;
      this.habilitarLocalidade = false;
      this.montForm();
    }
  }

  creatForm(){    
    this.formNivelIncluir = this.fb.group({     
      cdNivel: [null],    
      cdEmpresa: [null],      
      tipoNivel: [null, Validators.required],
      nmAbreviatura: [null, Validators.required],
      nmNivel: [null, Validators.required],
      dtVigenciaInicio: [null, Validators.compose([DateValidator.dateValidator, Validators.required, DateValidator.dataInvalida])],
      dtVigenciaFim: [null, Validators.compose([DateValidator.dateValidator, DateValidator.dataInvalida])],
      nrCentroDeCusto: [null],
      localidade: [null, Validators.required],
      empresa: [null],
      nivelPai: [null], 
      enderecoLocalidade: [null, Validators.required],
      dsEstrutura: [null],
      nivelAnexos: [null],
      creationTime: [null],
      createdByUser: [null],
      modificationTime: [null],
      modifiedByUser: [null],
      pesquisaDesignado: [null]
    }, { validator: DateRangeValidator.dataInicioMaior('dtVigenciaInicio', 'dtVigenciaFim') });

    this.creatFormNivelEstrutura();

  }

  creatFormNivelEstrutura() {
    this.formNivelEstrutura = this.fb.group({
      estrutura: [null],
      nome: [null],
      inicioVigencia: [null],
      fimVigencia: [null]
    });
  }

  montForm() {
    this.edicao = true;
    this.nivelService.findById(this.cdNivel.toString())
      .subscribe((nivel : any) => {
        this.nivel = nivel.nivel;
        this.tipoNiveis.push(nivel.nivel.tipoNivel);
        this.formNivelIncluir.patchValue({
          cdNivel: nivel.nivel.cdNivel,
          tipoNivel: nivel.nivel.tipoNivel,
          nmAbreviatura: nivel.nivel.nmAbreviatura,
          nmNivel: nivel.nivel.nmNivel,
          dtVigenciaInicio: nivel.nivel.dtVigenciaInicio,
          dtVigenciaFim: nivel.nivel.dtVigenciaFim,
          nrCentroDeCusto: nivel.nivel.nrCentroDeCusto,
          localidade: nivel.nivel.localidade,
          empresa: nivel.nivel.empresa,
          nivelPai: nivel.nivel.nivelPai,
          nivelAnexos: nivel.nivel.nivelAnexos,
          modificationTime: nivel.nivel.modificationTime,
          modifiedByUser: nivel.nivel.modifiedByUser,
          creationTime: nivel.nivel.creationTime,
          createdByUser: nivel.nivel.createdByUser
        });       

        this.carregarDesignado(this.formNivelIncluir.value.cdNivel);
        this.carregarEstruturaNivel(this.formNivelIncluir.value.cdNivel, 0);

        this.dataMinima = this.formNivelIncluir.value.dtVigenciaInicio;

        if (this.formNivelIncluir.value.tipoNivel != null) {
          this.ngxTipoNivel = this.formNivelIncluir.value.tipoNivel.cdTipoNivel;
        }

        if (this.formNivelIncluir.value.localidade != null) {
          this.ngxLocalidade = this.formNivelIncluir.value.localidade.cdLocalidade;
          this.cdEmpresa = nivel.nivel.empresa.cdEmpresa;
          this.carregarLocalidade();
        }
      },
      error => console.log(error));
  }

  carregarEstruturaNivel(cdNivelEstrutura: number, adicionarEstrutura: number) {
    this.nivelService.findNivelByEstrutura(cdNivelEstrutura, adicionarEstrutura)
      .subscribe(
      (estrutura : string) => {
        this.formNivelIncluir.patchValue({
          dsEstrutura: estrutura
        });
      },
      error => console.log(error));   
  }

  carregarDataInicioVigencia() {
    this.dataMinima = this.formNivelIncluir.value.dtVigenciaInicio;
    this.dtInicio = new Date(this.formNivelIncluir.value.dtVigenciaInicio);
    this.dtFim = new Date(this.formNivelIncluir.value.dtVigenciaFim);
    if (this.dtInicio.getTime() > this.dtFim.getTime()) {
      this.formNivelIncluir.patchValue({
        dtVigenciaFim: null
      });
    }
  }

  carregarLocalidade() {
    this.localidadeService.allByEmpresa(this.cdEmpresa)
      .subscribe((localidades : any) => {
        if (localidades != null) {
          for (let localidade of localidades) {
              this.localidades.push(localidade.localidade);
          }
        }
        this.carregarEnderecoLocalidade();
      },
      error => console.log(error));
  }

  carregarEnderecoLocalidade() {
    if (this.ngxLocalidade > 0) {
      this.localidade = this.localidades.find((obj => obj.cdLocalidade == this.ngxLocalidade));
      this.formNivelIncluir.patchValue({
        enderecoLocalidade: this.localidade.nmLogradouro + ', n° ' +
                            this.localidade.nrLogradouro + ' - ' +
                            this.localidade.vlCep + ' - ' +
                            this.localidade.nmBairro + ' - ' +
                            this.localidade.nmMunicipio + ', ' +
                            this.localidade.nmUf
      });
    }    
    this.spinner.hide();
  }

  removerEnderecoLocalidade() {
    this.formNivelIncluir.patchValue({
      enderecoLocalidade: null
    });
  }

  salvar() {
    this.spinner.show();
    const { cdNivel } = this.formNivelIncluir.value

    this.tipoNivel = this.tipoNiveis.find((obj => obj.cdTipoNivel == this.ngxTipoNivel));
    this.localidade = this.localidades.find((obj => obj.cdLocalidade == this.ngxLocalidade));
    this.empresa = this.empresas.find((obj => obj.cdEmpresa == this.cdEmpresa));

    if (this.mostrarDescricaoNivel) {      
      this.nivelService.findById(this.cdNivelEstrutura > 0 ? this.cdNivelEstrutura.toString() : this.cdNivel.toString())
        .subscribe(
        (nivel : any) => {
          this.nivelPai = this.cdNivelEstrutura > 0 ? nivel.nivel : nivel.nivel.nivelPai;
          this.save();
          this.cdNivelEstrutura = 0;
        },
        error => console.log(error));
    } else {
      this.nivelPai = null;
      this.anexoNivelService.findAllByNivel(cdNivel)
        .subscribe(anexos => this.save(anexos))
    }
    
  }

  save(anexos?: NivelAnexo[]){
    this.formNivelIncluir.patchValue({
      tipoNivel: this.tipoNivel,
      localidade: this.localidade,
      empresa: this.empresa == null ? this.formNivelIncluir.value.empresa : this.empresa,
      nivelPai: this.nivelPai,
      pesquisaDesignado: null,
      nivelAnexos: anexos
    });

    this.nivelService.save(this.formNivelIncluir.value)
      .subscribe(
        (result: any) => {
          this.nivel = result.nivel;
          this.cdNivel = this.nivel.cdNivel;
          this.habilitarTabs = false;
          this.montForm();
          this.sweetalertSucesso();
          this.spinner.hide();
        },
        error => console.log(error)
      );
  }

  sweetalertSucesso() {
    swal.fire('Nível salvo com sucesso!', '', 'success');
  }

  editarNivelEstrutura() {
    this.spinner.show();
    this.creatFormNivelEstrutura();
    this.item = null;            
    this.id = null;            
    this.parentId = null;    
    this.childrenOfNivel = {};
    this.organogramaNiveis = [];
    this.nodes = [];
    this.mostrarDescricaoNivel = false;
    this.nivelService.findNivelByPaiAndEmpresaClean(this.cdEmpresa)
    .subscribe(
      (organogramaNiveis : OrganogramaNiveis[]) => {        
        if (organogramaNiveis != null) {    

          for (let organogramaNivel of organogramaNiveis) {
            this.organogramaNiveis.push(organogramaNivel);
          }
          
          for (this.index = 0, length = this.organogramaNiveis.length; this.index < length; this.index++) {       
            this.item = this.organogramaNiveis[this.index];            
            this.id = this.item["id"];            
            this.parentId = this.item["children"] || 0;
            this.childrenOfNivel[this.id] = this.childrenOfNivel[this.id] || [];
            
            this.item["children"] = this.childrenOfNivel[this.id];
            
            this.childrenOfNivel[this.parentId] = this.childrenOfNivel[this.parentId] || [];
            this.childrenOfNivel[this.parentId].push(this.item);                 
          }
          
          this.jsonOrganograma = JSON.stringify(this.childrenOfNivel["EMPRESA_PAI"]);

          this.jsonOrganograma = this.jsonOrganograma.substring(1, this.jsonOrganograma.length-1);
          this.nodes = [JSON.parse(this.jsonOrganograma)];
          this.spinner.hide();
        }
      },
      error => console.log(error)); 
  }

  salvarNivelEstrutura() {
    this.cdNivelEstrutura = parseInt(this.cdNivelSelecionado, 10);
    if (this.mostrarDescricaoNivel) {
      this.carregarEstruturaNivel(this.cdNivelEstrutura, 1);
    } else {
      this.formNivelIncluir.patchValue({
        dsEstrutura: this.dsEstrutura
      });
    }    
  }

  filterNodes(text, tree) {
    tree.treeModel.filterNodes(text, true);
  }

  customTemplateStringOptions = {
    // displayField: 'subTitle',
    useCheckbox: true,
    useTriState: true,
    isExpandedField: 'expanded',
    idField: 'uuid',
    actionMapping,
    allowDrag: false
  };

  childrenCount(node: TreeNode): string {
    return node && node.children == null && node.children.length > 0 ? `(${node.children.length})` : '';
  } 

  descricaoNivel(node) {
    this.creatFormNivelEstrutura();
    if (node.data.id > 0) {
      this.cdNivelSelecionado = node.data.id;
      this.mostrarDescricaoNivel = true;
      this.organogramaNivel = this.organogramaNiveis.find((obj => obj.id == node.data.id));
      this.formNivelEstrutura.patchValue({
        nome: this.organogramaNivel.title,
        inicioVigencia: this.datePipe.transform(this.organogramaNivel.dtVigenciaInicio, 'yyyy-MM-dd'),
        fimVigencia: this.datePipe.transform(this.organogramaNivel.dtVigenciaFim, 'yyyy-MM-dd'),
      });
    } else {      
      this.dsEstrutura = node.data.name;
      this.cdNivelSelecionado = node.data.id;
      this.mostrarDescricaoNivel = false;
    }
    
  }

  removerEmpresa() {
    this.habilitarTipoNivel = true;
    this.habilitarLocalidade = true;
    this.empresas = [];
    this.tipoNiveis = [];
    this.localidades = [];
    this.ngxValueEmpresa = 0;
    this.ngxTipoNivel = 0;
    this.ngxTipoNivel = 0;

    this.formNivelIncluir.patchValue({
      enderecoLocalidade: null
    });
  }

  onKeyUp(event): void {    
    this.spinner.show();  
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
    this.empresaService.findByName(nmEmpresa)
    .subscribe(
        (empresas : any) => {               
            if (empresas != null) {
                this.empresas = [];                
                for (let empresa of empresas) {                                           
                    this.empresas.push(empresa.empresa);
                }
                this.spinner.hide();
            }                
        },
        error => console.log(error));                      
  }

  carregarTipoNivel() {
    this.cdEmpresa = this.ngxValueEmpresa;
    this.habilitarTipoNivel = false;
    this.habilitarLocalidade = false;
    this.allByTipoNiveis();
    this.carregarLocalidade();

    this.tipoNiveis = this.tipoNiveis.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj.nmAbreviatura).indexOf(obj.nmAbreviatura) === pos;
    });
  }

  allByTipoNiveis() {
    this.tipoNiveis = [];
    this.tipoNivelService.all()
    .subscribe(
        (tipoNiveis : any[]) => {
            if (tipoNiveis != null) {
                for (let tipoNivel of tipoNiveis) {
                    this.tipoNiveis.push(tipoNivel.tipoNivel);
                }
            }
        },
        error => console.log(error));
  }

  findByIdNivel(cdNivel: number) {
    this.nivelService.findById(cdNivel.toString())
    .subscribe(
    (nivel : any) => {
      this.nivelPai = nivel.nivel;
    },
    error => console.log(error));   
  }

  editarDesignado(cdDesignacao: number) {
    this.router.navigate(['designacoes/editar-formularios-permissao', cdDesignacao, this.cdNivel]);
  }

  carregarDesignado(cdNivel: number) {    
    this.designacaoService.findByNivelId(cdNivel)
    .subscribe(
        (designados : any) => {               
            if (designados != null) {
                this.designados = [];                
                for (let designado of designados) { 
                  this.designados.push(designado);
                }
            }                
        },
        error => console.log(error));                      
  }

  getLinkHistorico(column?: string){
    const id = this.route.snapshot.params['id']
    const { cdNivel = 0 } = this
    return this.router.url.replace(id, cdNivel.toString()) + '/historico' + (column ? '/' + column : '')
  }

  desabilitarHistorico(){
    const id = this.route.snapshot.params['id']
    const { cdNivel = 0 } = this
    return (!id || id === '0') && cdNivel == 0
  }

  voltarOrganograma() {
    this.router.navigate(['/estrutura/organogramaEmpresas', this.cdEmpresa, true]);
  }

  selecionarTodos() {
    console.log('selecionarTodos');
  }

}
