import { UsuarioI } from './Usuario.Interface';
export interface EmpleoI{
    idPropuesta?: number,
    idTipoPropuesta?: number,
    diasLaborables?: string,
    disponibilidad?: string,
    precioPorHora?: string,
    lugaresLaborables?: string, 
    descripcion?: string,
    fechaPropuesta?: string,
    estado?: number,
    certificado?:number,
    usuarioCreo?: UsuarioI,
}  


export interface DatosGeneralesI{
  disponibilidad?: number,
  diasLaborables?: string,
  tipoEmpleo?: string,
  precioEstimadoHora?: number;
}  

export interface DatosUbicacionI{
    municipios?: string,
}  

export interface DatosConocimientoI{
    certificado?: string,
    descripcion?:string,
}  