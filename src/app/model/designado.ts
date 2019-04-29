import {DesignacoesNiveis} from "./designacoesNiveis";
import { TipoDesignacao } from "./tipoDesignacao";

export interface Designado{
  cdDesignacao: number;
  createdByUser: string;
  creationTime: string;
  designacoesNiveis: DesignacoesNiveis [];
  dsCargo: string;
  dsCargoSubstituido: string;
  dsObservacao: string;
  dsTitulo: string;
  dsTituloSubstituido: string;
  email: string;
  flContador: boolean;
  matricula: number;
  matriculaSubstituido: number;
  modificationTime: string;
  modifiedByUser: string;
  nmDesignado: string;
  nmSubstituido: string;
  nrCrc: number;
  tipoDesignacao: TipoDesignacao;
}
