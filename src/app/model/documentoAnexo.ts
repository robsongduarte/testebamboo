import { Documento } from './documento';

export interface DocumentoAnexo {
    cdAnexo?: number
    documento: Documento
    nomeArquivo: string
    dateCreate: any
}
