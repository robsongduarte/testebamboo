import { Dominio } from './dominio';
export interface QuadroAssinatura{
    cdQuadroAssinatura: number;
    tipoQuadro: Dominio;
    tipoAssinatura: Dominio;
    valorAssinatura: number;
    modificationTime: String;
    modifiedByUser: String;
    creationTime: String;
    createdByUser:String;
}
