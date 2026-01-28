import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  private _lastLabelOverride = signal<string | null>(null);

  lastLabelOverride = this._lastLabelOverride.asReadonly();

  setLastLabel(label: string) {
    this._lastLabelOverride.set(label);
  }

  clearLastLabel() {
    this._lastLabelOverride.set(null);
  }
}
