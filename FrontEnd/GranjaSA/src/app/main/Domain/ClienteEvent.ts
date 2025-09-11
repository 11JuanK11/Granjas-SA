import { Cliente } from "./Cliente";

export interface ClienteEvent {
  cliente?: Cliente;   // se envía cuando se crea o actualiza
  deletedCedula?: number;  // se envía cuando se elimina
}
