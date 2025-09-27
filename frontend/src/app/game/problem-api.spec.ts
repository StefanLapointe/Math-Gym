import { TestBed } from '@angular/core/testing';

import { ProblemApi } from './problem-api';

describe('ProblemApi', () => {
  let service: ProblemApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProblemApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
