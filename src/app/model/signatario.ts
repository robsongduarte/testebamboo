import { Documento } from "./documento";
import { Dominio } from "./dominio";

export interface Signatario{
  cdSignatario: number;
  codigoMatricula: number;
  nomeSignatario: String;
  documento: Documento;
  descricaoTitulo: string;
  tipoAssinatura: Dominio;
  assinado: boolean;
}
