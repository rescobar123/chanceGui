import { EmpleoI } from './Empleo.Interface';
import { UsuarioI } from './Usuario.Interface';
import { DepartamentoI } from './Departamento.Interface';
export interface OfertaI{
    idOferta?: number,
    propuesta?: EmpleoI,
    precioPorHora?: number,
    fechaInicio?:string,
    fechaFin?:string,
    horaInicio?: string,
    horaFin?: string,
    complemento?:string,
    fechaCreacion?:string,
    estado?:number,
    usuario?:UsuarioI,
    idTipoEmpleo?:number,
    oferta:string,
    lugares:string,
    departamento:DepartamentoI
}  