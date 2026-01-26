import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SettingsFacade } from '../facade/settings.facade';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-settings-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
})
export class SettingsPageComponent {
  private fb = inject(FormBuilder);
  private facade = inject(SettingsFacade);

  readonly form = this.fb.nonNullable.group({
    professionalName: [''],
    cro: [''],
    clinicName: [''],
    appointmentDuration: [30],
  });

  constructor() {
    this.facade.settings$.subscribe(settings => {
      this.form.patchValue(settings);
    });
  }

  save() {
    this.facade.save({
      ...this.form.getRawValue(),
      locale: 'pt-BR',
    });
  }
}
