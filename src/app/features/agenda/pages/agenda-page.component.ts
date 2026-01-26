import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaFacade } from '../facade/agenda.facade';

import { MatCalendar } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'app-agenda-page',
  imports: [
    CommonModule,
    MatCalendar,
    MatCardModule,
  ],
  templateUrl: './agenda-page.component.html',
  styleUrl: './agenda-page.component.scss',
})
export class AgendaPageComponent {
  readonly facade = inject(AgendaFacade);
  readonly agenda$ = this.facade.agenda$;

  onDateSelected(date: Date) {
    this.facade.selectDate(date);
  }
}
