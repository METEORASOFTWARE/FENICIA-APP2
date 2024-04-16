
import { responseAPIDTO } from 'src/app/interface/response-interface';

export interface MisOfertasDTO extends responseAPIDTO {
  data? : MisOfertasListaDTO[]
}

export interface MisOfertasListaDTO {
  COD_PRODUCTO?: string;
  NOM_PRODUCTO?: string;
  AGRUPACION_EXTRA?: number;
  SW_INACTIVO?: string;
  DESC_NIVEL?: string;
  DESC_GONDOLA?: string;
  SW_INV_SERIALIZADO?: string;
}

export interface MisOfertasImagesDTO extends responseAPIDTO {
  data?: imagesDTO[];
}

interface imagesDTO {
  COD_PRODUCTO: string;
  CONSECUTIVO: string;
  URL: string;
}