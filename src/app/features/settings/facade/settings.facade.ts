import { inject, Injectable } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { Settings } from '../models/settings.model';

@Injectable({ providedIn: 'root' })
export class SettingsFacade {
  private service = inject(SettingsService);
  readonly settings$ = this.service.settings$;

  save(settings: Settings) {
    this.service.update(settings);
  }
}
