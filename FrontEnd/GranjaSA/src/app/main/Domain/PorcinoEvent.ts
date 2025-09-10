import { Porcino } from "./Porcino";

export interface PorcinoEvent {
  porcino?: Porcino;   // se envía cuando se crea o actualiza
  deletedId?: string;  // se envía cuando se elimina
}
