import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Patient } from '../models/patient.model';
import { RedirectCommand, RouterLink } from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-patient-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink
],
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss'],
})

export class PatientFormComponent {
  private fb = inject(FormBuilder);

  @Input() initialData?: Patient;
  @Input() submitLabel = 'Salvar';

  @Output() submitForm = new EventEmitter<
    Pick<Patient, 'nome' | 'idade' | 'planoTratamento' | 'dataInicio'>
  >();

  form = this.fb.nonNullable.group({
    nome: [''],
    idade: [0],
    planoTratamento: [''],
    dataInicio: [''],
  });

  ngOnChanges() {
    if (!this.initialData) return;

    this.form.patchValue({
      nome: this.initialData.nome,
      idade: this.initialData.idade,
      planoTratamento: this.initialData.planoTratamento,
      dataInicio: this.initialData.dataInicio,
    });
  }

  submit() {
    if (this.form.invalid) return;
    this.submitForm.emit(this.form.getRawValue());
    
  }
}
