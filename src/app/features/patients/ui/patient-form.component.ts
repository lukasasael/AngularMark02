import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Patient } from '../models/patient.model';

@Component({
  standalone: true,
  selector: 'app-patient-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss'],
})
export class PatientFormComponent implements OnChanges {
  private fb = inject(FormBuilder);

  @Input() patient: Patient | null = null;
  @Input() submitLabel = 'Salvar';

  @Output() save = new EventEmitter<{
    nome: string;
    idade: number;
    planoTratamento: string;
    dataInicio: string;
    historico: string;
  }>();

  readonly form = this.fb.nonNullable.group({
    nome: ['', [Validators.required]],
    idade: [0, [Validators.required, Validators.min(0)]],
    planoTratamento: ['', [Validators.required]],
    dataInicio: ['', [Validators.required]],
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['patient'] && this.patient) {
      this.form.patchValue({
        nome: this.patient.nome ?? '',
        idade: this.patient.idade ?? 0,
        planoTratamento: this.patient.planoTratamento ?? '',
        dataInicio: this.patient.dataInicio ?? '',
      });
    }
  }

  submit(): void {
    if (this.form.invalid) return;

    const value = this.form.getRawValue();

    this.save.emit({
      nome: value.nome,
      idade: value.idade,
      planoTratamento: value.planoTratamento,
      dataInicio: value.dataInicio,
      historico: this.patient?.historico ?? '',
    });
  }
}