import { EmpleoI } from './Empleo.Interface';
import { UsuarioI } from './Usuario.Interface';
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
    estado?:number
    usuario?:UsuarioI
}  