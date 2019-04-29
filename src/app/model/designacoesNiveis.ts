import {Nivel} from "./nivel";
import { Designacao } from "./designacao";

export interface DesignacoesNiveis{
  cdDesignacaoNivel: number;
  dtVigenciaFim: string;
  dtVigenciaInicio: string;
  nivel: Nivel;
  designacao: Designacao;
}
