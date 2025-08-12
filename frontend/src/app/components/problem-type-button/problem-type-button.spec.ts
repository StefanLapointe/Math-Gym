import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemTypeButton } from './problem-type-button';

describe('ProblemTypeButton', () => {
  let component: ProblemTypeButton;
  let fixture: ComponentFixture<ProblemTypeButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProblemTypeButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProblemTypeButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
