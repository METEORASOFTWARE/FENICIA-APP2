import { responseAPIDTO } from "./response-interface";

export interface DetalleGrupoElementoDTO extends responseAPIDTO {
    data?: DataDetalleGrupoElementoDTO[];
}

export interface DataDetalleGrupoElementoDTO {
  COD_PRODUCTO?: string;
  NOM_PRODUCTO?: string;
  AGRUPACION_EXTRA?: number;
  SW_INACTIVO?: string;
  DESC_NIVEL?: string;
  DESC_GONDOLA?: string;
  SW_INV_SERIALIZADO?: string;
}