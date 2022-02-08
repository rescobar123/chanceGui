export interface AlertI {
    mensaje: string;
    jwt?: Jwt; 
    tipo: string;
    error?: string;
    role?: 'cancel' | 'destructive' | string;
    cssClass?: string | string[];
    handler?: (value: any) => boolean | void | {[key: string]: any};
  }

  export interface Jwt {
    jwt?: string;
  }