export interface DetalleGrupoElementoInterface {
    success?: boolean;
    name?: string;
    data?: DataDetalleGrupoElemento[];
    code?: string;
}

export interface DataDetalleGrupoElemento {
  COD_PRODUCTO?: string;
  NOM_PRODUCTO?: string;
  DESC_GONDOLA?: string;
  URL?: string;
}