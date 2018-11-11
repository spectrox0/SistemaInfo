export interface Producto {
  id?: string;
  nombre?: string;
  img?: string;
  ing1?: string;
  ing2?: string;
  ing3?: string;
  categoria?: string;
  precio?: number;
  precioTotal?: number;
  iva?: number;
  descripcion?: string;
  disponibilidad?: boolean;
  fecha?: any;
  isPersonalizable?: boolean;
}
