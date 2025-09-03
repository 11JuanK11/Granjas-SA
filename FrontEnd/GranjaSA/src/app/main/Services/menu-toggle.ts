import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuToggle {
  private toggleSubject = new Subject<void>();

  public toggle$ = this.toggleSubject.asObservable();

  toggleMenu(): void{
    this.toggleSubject.next();
  }
}
