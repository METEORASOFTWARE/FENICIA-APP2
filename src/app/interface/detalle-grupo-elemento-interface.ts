import { responseAPIDTO } from "./response-interface";

export interface DetalleGrupoElementoDTO extends responseAPIDTO {
    data?: DataDetalleGrupoElementoDTO[];
}

export interface DataDetalleGrupoElementoDTO {
  COD_PRODUCTO?: string;
  NOM_PRODUCTO?: string;
  DESC_GONDOLA?: string;
}