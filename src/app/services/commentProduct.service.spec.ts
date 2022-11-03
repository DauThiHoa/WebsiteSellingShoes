import { TestBed } from '@angular/core/testing';

import { CommentProductService } from './commentProduct.service';

describe('CommentService', () => {
  let service: CommentProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
