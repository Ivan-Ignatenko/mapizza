import { TestBed } from '@angular/core/testing';

import { ActionsService } from './actions.service';
import { HttpClientModule } from '@angular/common/http';

describe('ActionsService', () => {
  let service: ActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(ActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
