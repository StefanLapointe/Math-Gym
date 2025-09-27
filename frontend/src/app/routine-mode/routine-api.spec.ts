import { TestBed } from '@angular/core/testing';

import { RoutineApi } from './routine-api';

describe('RoutineApi', () => {
  let service: RoutineApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutineApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
