import { Cliente } from "./Cliente";
import { Porcino } from "./Porcino";

export interface PorcinoEvent {
  porcino?: Porcino;   // se envía cuando se crea o actualiza
  porcinos?: Porcino[];
  clientes?: Cliente[]

  deletedId?: string;  // se envía cuando se elimina
}
