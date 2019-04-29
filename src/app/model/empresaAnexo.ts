import { Empresa } from './empresa'

export interface EmpresaAnexo {
    cdAnexo?: number
    empresa: Empresa
    nomeArquivo: string
    dateCreate: any
}
