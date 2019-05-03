import { NgxSpinnerService } from 'ngx-spinner';
import { AnexoNivelService } from '../../../../../service/estrutura/anexo-nivel.service';
import { NivelAnexo } from '../../../../../model/nivelAnexo';
import { Component, OnInit, Input, Inject, Injectable, LOCALE_ID } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { DOCUMENT, DatePipe } from '@angular/common'

import Swal from 'sweetalert2'
import { SweetAlertOptions } from 'sweetalert2'
import { Nivel } from '../../../../../model/nivel';

@Injectable()
@Component({
  selector: 'app-anexos-nivel',
  templateUrl: './anexos.nivel.component.html',
  providers: [DatePipe]
})
export class AnexosNivelComponent implements OnInit {

  public p: number;

  @Input() cdNivel: number

  anexos: NivelAnexo[] = []
  heads = ['Arquivo', 'Criação']
  arquivoSelecionado: File
  fileUrl

  constructor(private anexoNivelService: AnexoNivelService,
              private modalService: NgbModal,
              @Inject(DOCUMENT) private document: any,
              @Inject(LOCALE_ID) private locale: string,
              private datePipe: DatePipe,
              private spinner: NgxSpinnerService) {}

  ngOnInit() {
    if(this.cdNivel != undefined){
      this.carregarAnexos()
    }
  }

  carregarAnexos(){
    this.anexoNivelService.findAllByNivel(this.cdNivel)
      .subscribe(anexos => {
        this.anexos = anexos,
        this.spinner.hide()
      })
  }

  onFileSelected(event){
    if(event == undefined){
      return
    }
    this.arquivoSelecionado = <File> event.target.files[0]
  }

  clearFileSelected(){
    this.arquivoSelecionado = undefined
  }

  salvarArquivo() {
    this.spinner.show();
    this.anexoNivelService.upload(this.arquivoSelecionado)
      .subscribe(({ value0 }) => this.salvarAnexo(<string> value0),
      () => Swal.fire(this.error({
          text: 'Houve um erro ao salvar o arquivo.'
      })))
  }

  salvarAnexo(nomeArquivo: string){    
    this.anexoNivelService.save(this.createNivelAnexo(nomeArquivo))
      .subscribe(() => {
        this.carregarAnexos();
        this.clearFileSelected();
        this.spinner.hide();
      },
      () => Swal.fire(this.error({
          text: 'Houve um erro ao salvar o anexo.'
      })),
      () => Swal.fire(this.success({
          text: 'Seu arquivo foi salvo com sucesso.'
      })))
  }

  createNivelAnexo(nomeArquivo: string): NivelAnexo {
    const nivel: Nivel = { cdNivel: this.cdNivel } as Nivel
    return { nomeArquivo, nivel , dateCreate: new Date() } as NivelAnexo
  }

  success(settings?: SweetAlertOptions): SweetAlertOptions {
    const options = {
      type: 'success',
      title: 'Sucesso',
      showCancelButton: false,
      confirmButtonText: 'Ok'
    } as SweetAlertOptions
    return this.modal(Object.assign(options, settings ? settings : {}))
  }

  error(settings?: SweetAlertOptions): SweetAlertOptions {
    const options = {
      type: 'error',
      title: 'Erro',
      showCancelButton: false,
      confirmButtonText: 'Ok'
    } as SweetAlertOptions
    return this.modal(Object.assign(options, settings ? settings : {}))
  }

  modal(settings?: SweetAlertOptions): SweetAlertOptions {
    const options = {
      title: 'Deseja realmente excluir o Anexo?',
      type: 'warning',
      showCancelButton: true,
      reverseButtons: true,
      cancelButtonColor: '#F90808',
      cancelButtonClass: "btn btn-danger",
      cancelButtonText: 'Não',
      confirmButtonColor: '#23AB16',
      confirmButtonClass: "btn btn-success",
      confirmButtonText: 'Sim'
    } as SweetAlertOptions
    return Object.assign(options, settings ? settings : {})
  }

  download({ cdAnexo, nomeArquivo }: NivelAnexo){
    this.anexoNivelService.download(cdAnexo)
      .subscribe(({ value0, value1 }) => this.downloadFile(value1, value0, this.getNameFile(nomeArquivo)),
      () => Swal.fire(this.error({
          text: 'Houve um erro ao baixar o arquivo.'
      })))
  }

  downloadFile(arquivo: any, type: string, name: string) {
    let link = this.document.createElement("a")
    link.href = `data:${type};base64, ${encodeURIComponent(arquivo)}`
    link.download = name
    this.document.body.appendChild(link)
    link.click()
    link.remove()
  }

  excluir({ cdAnexo }: NivelAnexo){
    this.spinner.show();
    Swal.fire(this.modal()).then((result) => {
      if (result.value) {
        this.deleteFile(cdAnexo)
      }
    })
  }

  deleteFile(cdAnexo: number){
    this.anexoNivelService.deleteFile(cdAnexo)
      .subscribe(() => this.deleteAnexo(cdAnexo),
      () => this.deleteAnexo(cdAnexo))      
  }

  deleteAnexo(cdAnexo: number){        
    this.anexoNivelService.delete(cdAnexo)
      .subscribe(() => this.carregarAnexos(),
      () => Swal.fire(this.error({
          text: 'Houve um erro ao excluir o anexo.'
      })),
      () => Swal.fire(this.success({          
          text: 'Seu arquivo foi excluído com sucesso.'
      })))
      
  }

  openAnexoModal(anexomodal) {
    this.modalService.open(anexomodal, { ariaLabelledBy: 'modal-basic-title' })
        .result.then((result) => this.saveOrClear(result),
        () => this.clearFileSelected())
  }

  saveOrClear(result: string){
    result == 'salvar' ? this.salvarArquivo() : this.clearFileSelected()
  }

  getNameFile(name: string): string {
    return name ? name.substring(name.indexOf('-') + 1) : ''
  }

  getDateFile(timestamp: number): string {
    return timestamp ? this.datePipe.transform(new Date(timestamp), 'medium', this.locale) : ''
  }

}
