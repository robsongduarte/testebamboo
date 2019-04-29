import { QuadroAssinatura } from './quadro.assinatura';
import { Dominio } from './dominio';

export interface Cargo {
  cdCargo: number;
  tipoCargo: Dominio;
  flAtivo: boolean;
  quadrosAssinaturas: QuadroAssinatura[];
  modificationTime: any;
  modifiedByUser: string;
  creationTime: any;
  createdByUser: string;
}
