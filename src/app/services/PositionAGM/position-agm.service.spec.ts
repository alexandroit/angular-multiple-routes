import { TestBed } from '@angular/core/testing';

import { PositionAGMService } from './position-agm.service';

describe('PositionAGMService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PositionAGMService = TestBed.get(PositionAGMService);
    expect(service).toBeTruthy();
  });
});
