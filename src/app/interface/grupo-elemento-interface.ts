import { responseAPIDTO } from "./response-interface";

export interface GrupoElementoDTO extends responseAPIDTO {
  data?: DataGrupoElementosDTO[];
}

export interface DataGrupoElementosDTO {
  DESC_NIVEL?: string;
  COD_NIVEL?: number;
  SELECTED?: Boolean;
}