import { Injectable } from '@angular/core';
import { BehaviorSubject, switchMap } from 'rxjs';
import { AgendaService } from '../services/agenda.service';

@Injectable({ providedIn: 'root' })
export class AgendaFacade {
  private selectedDate$ = new BehaviorSubject<string>(this.today());

  readonly agenda$ = this.selectedDate$.pipe(
    switchMap(date => this.service.getAgendaByDate(date))
  );

  constructor(private service: AgendaService) {}

  selectDate(date: Date) {
    this.selectedDate$.next(date.toISOString().slice(0, 10));
  }

  get selectedDate() {
    return this.selectedDate$.value;
  }

  private today() {
    return new Date().toISOString().slice(0, 10);
  }
}
