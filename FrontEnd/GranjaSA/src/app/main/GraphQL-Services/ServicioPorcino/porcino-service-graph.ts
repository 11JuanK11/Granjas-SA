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

  private porcinoSubject = new Subject<PorcinoEvent>();
  porcino$ = this.porcinoSubject.asObservable();

  /** 🔄 Helper para clonar evitando objetos congelados */
  private clone<T>(obj: T): T {
    return typeof structuredClone === 'function'
      ? structuredClone(obj)
      : JSON.parse(JSON.stringify(obj));
  }

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
    `,
    fetchPolicy: 'network-only',   // 👈 fuerza consulta a la DB
    nextFetchPolicy: 'network-only'
  }).valueChanges.pipe(
    map(result => this.clone(result.data.porcinos))
  );
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
      map(result => this.clone(result.data!.crearPorcino)),
      tap(newPorcino =>
        this.porcinoSubject.next({ porcino: this.clone(newPorcino) })
      )
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
      map(result => this.clone(result.data!.crearListaPorcinos)),
      tap(newPorcinos =>
        this.porcinoSubject.next({ porcinos: this.clone(newPorcinos) })
      )
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
      map(result => this.clone(result.data!.actualizarPorcino)),
      tap(updated =>
        this.porcinoSubject.next({ porcino: this.clone(updated) })
      )
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
      map(result => this.clone(result.data!.eliminarPorcino.mensaje)),
      tap(() => this.porcinoSubject.next({ deletedId: id }))
    );
  }
}
