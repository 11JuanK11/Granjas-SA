import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map, tap } from 'rxjs';
import { Subject } from 'rxjs';
import { Cliente } from 'app/main/Domain/Cliente';
import { ClienteEvent } from 'app/main/Domain/ClienteEvent';

@Injectable({
  providedIn: 'root'
})
export class ClienteServiceGraph {
  constructor(private apollo: Apollo) {}

  private clienteSubject = new Subject<ClienteEvent>();
  cliente$ = this.clienteSubject.asObservable();

  // ===================== GET ALL =====================
getAll(): Observable<Cliente[]> {
  return this.apollo.watchQuery<{ clientes: Cliente[] }>({
    query: gql`
      query {
        clientes {
          cedula
          nombres
          apellidos
          direccion
          telefono
        }
      }
    `,
    fetchPolicy: 'network-only',   // 👈 fuerza consulta a la DB
    nextFetchPolicy: 'network-only'
  }).valueChanges.pipe(
    map(result =>
      result.data.clientes.map(c => ({ ...c }))
    )
  );
}


  // ===================== CREATE =====================
  create(cliente: Cliente): Observable<Cliente> {
    return this.apollo.mutate<{ crearCliente: Cliente }>({
      mutation: gql`
        mutation ($input: ClienteInput!) {
          crearCliente(input: $input) {
            cedula
            nombres
            apellidos
            direccion
            telefono
          }
        }
      `,
      variables: { input: cliente }
    }).pipe(
      map(result => {
        const created = result.data!.crearCliente;
        return { ...created }; // 👈 clonado
      }),
      tap(newCliente =>
        this.clienteSubject.next({ cliente: newCliente })
      )
    );
  }

  // ===================== UPDATE =====================
  update(cliente: Cliente): Observable<Cliente> {
    return this.apollo.mutate<{ actualizarCliente: Cliente }>({
      mutation: gql`
        mutation ($input: ActualizarClienteInput!) {
          actualizarCliente(input: $input) {
            cedula
            nombres
            apellidos
            direccion
            telefono
          }
        }
      `,
      variables: { input: cliente }
    }).pipe(
      map(result => {
        const updated = result.data!.actualizarCliente;
        return { ...updated }; // 👈 clonado
      }),
      tap(updated =>
        this.clienteSubject.next({ cliente: updated })
      )
    );
  }

  // ===================== DELETE =====================
  delete(cedula: number): Observable<string> {
    return this.apollo.mutate<{ eliminarCliente: { mensaje: string } }>({
      mutation: gql`
        mutation ($idCliente: Int!) {
          eliminarCliente(idCliente: $idCliente) {
            mensaje
          }
        }
      `,
      variables: { idCliente: cedula }
    }).pipe(
      map(result => result.data!.eliminarCliente.mensaje),
      tap(() =>
        this.clienteSubject.next({ deletedCedula: cedula })
      )
    );
  }
}
