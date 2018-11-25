
export interface ProductoPedido {
  id?: string;
  idUser?: string;
  emailUser?: string;
  nombre?: string;
  precio?: number;
  iva?: number;
  precioTotal?: number;
  cantidad?: number;
  fecha?: any;
  dir1?: string;
  dir2?: string;
  dir3?: string;
  dir4?: string;
  ing1?: string;
  ing2?: string;
  option?: string [];
  isEntregado?: boolean;
  urlImg?: string;
}
