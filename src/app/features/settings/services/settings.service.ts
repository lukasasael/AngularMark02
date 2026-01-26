import { Injectable } from '@angular/core';
import { Settings } from '../models/settings.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private readonly settingsSubject = new BehaviorSubject<Settings>({
    professionalName: 'Dr. João Silva',
    cro: 'CRO-SP 12345',
    clinicName: 'AP Clinical Center',
    appointmentDuration: 30,
    locale: 'pt-BR',
  });

  readonly settings$ = this.settingsSubject.asObservable();

  update(settings: Settings) {
    this.settingsSubject.next(settings);
  }
}
