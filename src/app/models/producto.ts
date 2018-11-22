export interface Producto {
  id?: string;
  nombre?: string;
  img?: string;
  idImg?: string;
  extras?: string [];
  categoria?: string;
  precio?: number;
  precioTotal?: number;
  iva?: number;
  descripcion?: string;
  disponibilidad?: boolean;
  fecha?: any;
  isPersonalizable?: boolean;
}
