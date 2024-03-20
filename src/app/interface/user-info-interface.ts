import { responseAPIDTO } from "./response-interface";

export interface UserInfoInterface  extends responseAPIDTO{
    data: UserInfoData[]
}

export interface UserInfoData {
  COD_CLIE: string;
  NOM_CLIE: string;
  TEL_CLIE?: any;
  SW_INACTIVO: number;
  E_MAIL?: any;
  PWA_ID: string;
}

export interface UserCreatedInterface extends responseAPIDTO {
  message : string;
}

export interface UserInfoCreatedInterface {
  create: UserCreatedInterface | null,
  info?: UserInfoInterface | null
}