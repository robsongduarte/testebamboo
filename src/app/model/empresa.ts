import { Cargo } from './cargo';
import { Localidade } from "./localidade";
import {EmpresaAnexo} from "./empresaAnexo";

export interface Empresa {
  cdEmpresa: number;
  nmEmpresa: String;
  nmSigla: String;
  nmDenominacaoSocial: String;
  flAtivo: boolean;
  nrParticipacaoCapital: number;
  tipoEmpresa: String;
  tipoNorma: Cargo;
  localidades: Localidade[];
  empresaAnexos: EmpresaAnexo[];
  modificationTime: any;
  modifiedByUser: String;
  creationTime: any;
  createdByUser: String;
  empresaControladora: Empresa;
  codigoEmpresaEbs: Number;
}
