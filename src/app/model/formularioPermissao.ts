import { Designado } from './designado';
import { Documento } from './documento';


export interface FormularioPermissao{
  cdFormularioPermissao: number;
  documento: Documento;
  designacao: Designado;
  flSubstituicao: boolean;
  flEstrutura: boolean;
  flFormularioFilho: boolean;
  cdFormularioPai: number;
  modificationTime: any;
  modifiedByUser: String;
  creationTime: any;
  createdByUser: String;
}
