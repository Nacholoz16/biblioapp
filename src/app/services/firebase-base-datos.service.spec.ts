import { TestBed } from '@angular/core/testing';

import { FirebaseBaseDatosService } from './firebase-base-datos.service';

describe('FirebaseBaseDatosService', () => {
  let service: FirebaseBaseDatosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseBaseDatosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
