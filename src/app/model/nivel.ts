import { NivelAnexo } from './nivelAnexo';
import { TipoNivel } from './tipoNivel';
import { Localidade } from './localidade';
import { Empresa } from './empresa';
export interface Nivel{
  empresa: Empresa;
  cdNivel: number;
  nivelPai: Nivel, 
  localidade: Localidade,
  tipoNivel: TipoNivel,
  dtVigenciaFim: string;
  dtVigenciaInicio: string;
  nmAbreviatura: string;
  nmEmpresa: String;
  nmNivel: string;  
  nmSiglaEmpresa: String;
  nivelAnexos: NivelAnexo[];
  modificationTime: any;
  modifiedByUser: String;
  creationTime: any;
  createdByUser: String;
}
