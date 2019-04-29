import { FormularioPermissao } from './formularioPermissao';
import { Dominio } from "./dominio";
import { Signatario } from './signatario';

export interface Documento{
  cdDocumento: number;
  numeroDocumento: string;
  cdEmpresa: number;
  versao: number;
  referencia: number;
  dataEmissao: string;
  status: number;
  cdEmitente: number;
  nmAbreviaturaEmitente: string;
  conteudo: string;
  tipoDocumento: Dominio;
  tipoMotivo: Dominio;
  matriculaAutor: number;
  nomeAutor: string;
  cdMatriculaResponsavel: number;
  nomeResponsavel: string;
  dsMotivoCancelamento: string;
  formulariosPermissao: FormularioPermissao[];
  signatarios: Signatario[];
  modificationTime: any;
  modifiedByUser: String;
  creationTime: any;
  createdByUser: String;
}
