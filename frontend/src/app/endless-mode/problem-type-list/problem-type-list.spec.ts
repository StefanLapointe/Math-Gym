import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemTypeList } from './problem-type-list';

describe('ProblemTypeList', () => {
  let component: ProblemTypeList;
  let fixture: ComponentFixture<ProblemTypeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProblemTypeList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProblemTypeList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
