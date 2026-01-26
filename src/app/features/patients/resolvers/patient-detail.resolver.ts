import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { PatientsFacade } from '../facade/patients.facade';

export const patientDetailResolver: ResolveFn<boolean> = (route) => {
  const patientsFacade = inject(PatientsFacade);

  const id = route.paramMap.get('id');

  if (id) {
    patientsFacade.selectPatient(id);
  }

  return true;
};
