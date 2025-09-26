import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map, tap } from 'rxjs';
import { Porcino } from 'app/main/Domain/Porcino';
import { PorcinoEvent } from 'app/main/Domain/PorcinoEvent';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PorcinoServiceGraph {
  constructor(private apollo: Apollo) {}

  // 🔔 Subject para notificaciones
  private porcinoSubject = new Subject<PorcinoEvent>();
  porcino$ = this.porcinoSubject.asObservable();

  // ===================== GET ALL =====================
  getAll(): Observable<Porcino[]> {
    return this.apollo.watchQuery<{ porcinos: Porcino[] }>({
      query: gql`
        query {
          porcinos {
            id
            raza
            edad
            peso
            alimentacion {
              id
              descripcion
              dosis
            }
            cliente {
              cedula
              nombres
              apellidos
              direccion
              telefono
            }
          }
        }
      `
    }).valueChanges.pipe(map(result => result.data.porcinos));
  }

  // ===================== CREATE =====================
  create(porcino: Porcino): Observable<Porcino> {
    return this.apollo.mutate<{ crearPorcino: Porcino }>({
      mutation: gql`
        mutation ($input: PorcinoInput!) {
          crearPorcino(input: $input) {
            id
            raza
            edad
            peso
            alimentacion {
              id
              descripcion
              dosis
            }
            cliente {
              cedula
              nombres
              apellidos
              direccion
              telefono
            }
          }
        }
      `,
      variables: { input: porcino }
    }).pipe(
      map(result => result.data!.crearPorcino),
      tap(newPorcino => this.porcinoSubject.next({ porcino: newPorcino })) // 🔔 notificación
    );
  }

  // ===================== CREATE LIST =====================
  createPorcinos(porcinos: Porcino[]): Observable<Porcino[]> {
    return this.apollo.mutate<{ crearListaPorcinos: Porcino[] }>({
      mutation: gql`
        mutation ($input: [PorcinoInput!]!) {
          crearListaPorcinos(input: $input) {
            id
            raza
            edad
            peso
            alimentacion {
              id
              descripcion
              dosis
            }
            cliente {
              cedula
              nombres
              apellidos
              direccion
              telefono
            }
          }
        }
      `,
      variables: { input: porcinos }
    }).pipe(
      map(result => result.data!.crearListaPorcinos),
      tap(newPorcinos => this.porcinoSubject.next({ porcinos: newPorcinos })) // 🔔 notificación múltiple
    );
  }

  // ===================== UPDATE =====================
  update(porcino: Porcino): Observable<Porcino> {
    return this.apollo.mutate<{ actualizarPorcino: Porcino }>({
      mutation: gql`
        mutation ($input: ActualizarPorcinoInput!) {
          actualizarPorcino(input: $input) {
            id
            raza
            edad
            peso
            alimentacion {
              id
              descripcion
              dosis
            }
            cliente {
              cedula
              nombres
              apellidos
              direccion
              telefono
            }
          }
        }
      `,
      variables: { input: porcino }
    }).pipe(
      map(result => result.data!.actualizarPorcino),
      tap(updated => this.porcinoSubject.next({ porcino: updated })) // 🔔 notificación
    );
  }

  // ===================== DELETE =====================
  delete(id: string): Observable<string> {
    return this.apollo.mutate<{ eliminarPorcino: { mensaje: string } }>({
      mutation: gql`
        mutation ($id: String!) {
          eliminarPorcino(id: $id) {
            mensaje
          }
        }
      `,
      variables: { id }
    }).pipe(
      map(result => result.data!.eliminarPorcino.mensaje),
      tap(() => this.porcinoSubject.next({ deletedId: id })) // 🔔 notificación de eliminación
    );
  }
}
