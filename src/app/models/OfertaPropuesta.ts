import { OfertaI } from './Oferta.Interface';
import { EmpleoI } from './Empleo.Interface';
export interface OfertaPropuestaI{
    idOfertaAplicada?: number,
    oferta?: OfertaI,
    fechaAplicacion?: string,
    estado?:number,
    propuesta?:EmpleoI
}