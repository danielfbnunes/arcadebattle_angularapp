import { TestBed } from '@angular/core/testing';

import { ArcadebattleService } from './arcadebattle.service';

describe('ArcadebattleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArcadebattleService = TestBed.get(ArcadebattleService);
    expect(service).toBeTruthy();
  });
});
