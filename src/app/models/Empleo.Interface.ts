export interface EmpleoI{
    datosGenerales?: DatosGeneralesI,
    datosUbicacion?: DatosUbicacionI,
    datosConocimiento?: DatosConocimientoI,
}  


export interface DatosGeneralesI{
  disponibilidad?: number,
  horario?: string,
  diasLaborables?: string,
}  

export interface DatosUbicacionI{
    departamentos?: string,
}  

export interface DatosConocimientoI{
    certificado?: string,
    descripcion?:string,
}  