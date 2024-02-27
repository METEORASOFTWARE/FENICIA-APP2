
export interface GrupoElementoInterface {
  success?: boolean;
  name?: string;
  data: DataGrupoElementos[];
  code?: string;
}

export interface DataGrupoElementos {
  DESC_NIVEL: string;
  COD_NIVEL: number;
  SELECTED : Boolean;
}