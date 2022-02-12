import { EmpleoI } from './Empleo.Interface';
import { OfertaI } from './Oferta.Interface';
export interface ComentarioI{
    idComentario?:number,
    recibeEnvia?: string,
    fechaHora?:string,
    contenido?:string,
    estado?:number,
    propuesta:EmpleoI,
    oferta:OfertaI
}  