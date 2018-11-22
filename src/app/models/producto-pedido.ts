
export interface ProductoPedido {
  id?: string;
  nombre?: string;
  precio?: number;
  iva?: number;
  precioTotal?: number;
  cantidad?: number;
  fecha?: any;
  ing1?: string;
  ing2?: string;
  option?: string [];
  isEntregado?: boolean;
  urlImg?: string;
}
